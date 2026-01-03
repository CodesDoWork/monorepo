import type SMTPConnection from "nodemailer/lib/smtp-connection";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { createTransport } from "nodemailer";
import { z } from "zod";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import {
    GetContactActionDataDocument,
    GetContactActionLanguagesDocument,
    GetContactServerDataDocument,
} from "../../graphql/default/generated/graphql";
import { transformRoutes } from "../../lib/common/routes";
import { getLanguage } from "../../lib/server/language";
import { mapSocial } from "../../lib/server/map-socials";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetContactServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { contact } = flattenTranslations(data);
    const { socials, ...texts } = contact;
    const jsonLdThings = createJsonLdThings(parentData);

    return {
        texts,
        jsonLdThings,
        socials: socials.map(s => ({ ...mapSocial(s.socialItem), isSeeMore: s.isSeeMore })),
    };
};

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentLanguage, socials } = parentData;
    return [
        {
            "@type": "ContactPage",
            inLanguage: currentLanguage.short,
            mainEntity: {
                "@type": "ContactPoint",
                sameAs: socials.map(s => s.href),
            },
        },
    ];
}

const smtpOptions: SMTPConnection.Options = {
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    secure: false,
    auth: {
        user: env.SMTP_USERNAME,
        pass: env.SMTP_PASSWORD,
    },
};

const mailTransport = createTransport(smtpOptions);
const zMessage = z
    .object({
        name: z.string(),
        email: z.email(),
        message: z.string(),
        privacy: z.coerce.boolean(),
    })
    .strict();
type Message = z.infer<typeof zMessage>;

export const actions: Actions = {
    mail: async event => {
        const formData = await event.request.formData();
        const data = Object.fromEntries(formData.entries());
        const msgResult = zMessage.safeParse(data);
        if (!msgResult.success) {
            return { success: false, data, msg: msgResult.error.message };
        }

        return processMessage(event, msgResult.data);
    },
};

async function processMessage(event: RequestEvent, msg: Message) {
    const languageData = await queryDefault({ query: GetContactActionLanguagesDocument });
    const allRoutes = transformRoutes(languageData.allRoutes);
    const language = await getLanguage(
        event.request,
        event.cookies,
        languageData.languages,
        allRoutes,
    );

    const contactData = await queryDefault({
        query: GetContactActionDataDocument,
        variables: { language: language.code },
    });
    const { contact } = flattenTranslations(contactData);

    const { name, email, message, privacy } = msg;
    if (!privacy) {
        return { success: false, data: msg, msg: contact.privacyError };
    }

    try {
        await mailTransport.sendMail({
            html: `<p>From: <strong>${name}</strong> <<i>${email}</i>></p><br /><br</> <p>${message.replace(/\n/g, "<br />")}</p>`,
            from: env.SMTP_USERNAME,
            to: env.SMTP_USERNAME,
            subject: `[Just-Site] New Message from ${name}`,
        });
        return { success: true, msg: contact.successMsg };
    } catch (err) {
        return { success: false, data: msg, msg: err.toString() };
    }
}
