import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { Actions, PageServerLoad, RequestEvent } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { SMTPClient } from "emailjs";
import { z } from "zod";
import { env } from "../../env";
import {
    GetContactActionData,
    GetContactActionLanguages,
    GetContactServerData,
} from "../../graphql/default/generated/gql";
import { getLanguage } from "../../shared/language";
import { mapSocial } from "../../shared/mapSocials";
import { createBreadcrumbList, domainUrl } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;
    const { contact } = flattenTranslations(
        await toPromise(GetContactServerData({ variables: { language: currentLanguage.code } })),
    );
    const { socials, ...texts } = contact;
    const jsonLdThings = createJsonLdThings(parentData);

    return {
        texts,
        jsonLdThings,
        socials: socials.map(s => ({ ...mapSocial(s.socialItem), isSeeMore: s.isSeeMore })),
    };
};

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentLanguage, currentRoute, socials, homeRoute } = parentData;
    return [
        {
            "@type": "ContactPage",
            name: currentRoute.name,
            description: currentRoute.description,
            url: domainUrl(currentRoute),
            inLanguage: currentLanguage.short,
            mainEntity: {
                "@type": "ContactPoint",
                url: domainUrl(currentRoute),
                sameAs: socials.map(s => s.href),
            },
        },
        createBreadcrumbList(currentRoute, homeRoute),
    ];
}

const client = new SMTPClient({
    user: env.SMTP_USERNAME,
    password: env.SMTP_PASSWORD,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    tls: true,
});

const zMessage = z
    .object({
        name: z.string(),
        email: z.string().email(),
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
    const { languages } = await toPromise(GetContactActionLanguages({}));
    const language = await getLanguage(event.request, event.cookies, languages);
    const { contact } = flattenTranslations(
        await toPromise(GetContactActionData({ variables: { language: language.code } })),
    );

    const { name, email, message, privacy } = msg;
    if (!privacy) {
        return { success: false, data: msg, msg: contact.privacyError };
    }

    try {
        await client.sendAsync({
            text: `From: ${name} <${email}>\n\n ${message}`,
            from: `${name} <${email}>`,
            to: env.SMTP_USERNAME,
            subject: `[Just-Site] New Message from ${name}`,
        });
        return { success: true, msg: contact.successMsg };
    } catch (err) {
        return { success: false, data: msg, msg: err.toString() };
    }
}
