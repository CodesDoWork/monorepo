import type SMTPConnection from "nodemailer/lib/smtp-connection";
import type { $ZodErrorTree } from "zod/v4/core";
import type { Actions, PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { createTransport } from "nodemailer";
import { z } from "zod";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import {
    GetContactDataDocument,
    GetContactFormDataDocument,
} from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetContactSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.contact.";

    const { contact } = await queryDefault({ query: GetContactDataDocument });
    const { translations } = await querySystem({
        query: GetContactSystemDataDocument,
        variables: { pageIdPrefix },
    });

    interface MapData {
        coordinates: [number, number];
        type: "Point";
    }

    const mapData: MapData = contact.coordinates;
    const { coordinates } = mapData;
    coordinates.reverse();

    return {
        ...contact,
        acceptPrivacyPolicy: formatWYSIWYG(contact.acceptPrivacyPolicy),
        contactPhoto: directusImageParams({
            ...defaultNull(contact.contactPhoto),
            alt: "contact",
            assetParams: { quality: 50, width: 720 },
        }),
        coordinates,
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};

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

z.config(z.locales.de());
const zMessage = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
        message: z.string(),
        privacy: z.coerce.boolean(),
        attachments: z.array(z.file()),
    })
    .strict();
type Message = z.infer<typeof zMessage>;

export const actions: Actions = {
    mail: async event => {
        const formData = await event.request.formData();
        const data = {
            firstName: formData.get("firstName").toString(),
            lastName: formData.get("lastName").toString(),
            email: formData.get("email").toString(),
            message: formData.get("message").toString(),
            privacy: formData.get("privacy") === "on",
            attachments: formData.getAll("attachments") as File[],
        };
        const { attachments, ...nonAttachmentData } = data;
        const msgResult = zMessage.safeParse(data);
        if (!msgResult.success) {
            return { data: nonAttachmentData, errors: z.treeifyError(msgResult.error).properties };
        }

        if (!msgResult.data.privacy) {
            const privacyErrors: $ZodErrorTree<Message>["properties"] = {
                privacy: { errors: ["must be checked"] },
            };
            return { data: nonAttachmentData, errors: privacyErrors };
        }

        const { contact } = await queryDefault({ query: GetContactFormDataDocument });
        const { msgReceiver } = contact;
        try {
            const { firstName, lastName, email, message } = data;
            await mailTransport.sendMail({
                html: `<p>Von: <strong>${firstName} ${lastName}</strong> <<i>${email}</i>></p><br /><br</> <p>${message.replace(/\n/g, "<br />")}</p>`,
                from: env.SMTP_USERNAME,
                to: msgReceiver,
                subject: `[Webseite] Neue Nachricht von ${firstName} ${lastName}`,
                attachments: await Promise.all(
                    attachments
                        .filter(att => att.name !== "")
                        .map(async att => ({
                            filename: att.name,
                            content: Buffer.from(await att.arrayBuffer()),
                        })),
                ),
            });
            return { success: true };
        } catch (err) {
            const errors: $ZodErrorTree<Message>["properties"] = {
                message: { errors: [err.toString()] },
            };
            return { success: false, data: nonAttachmentData, errors };
        }
    },
};
