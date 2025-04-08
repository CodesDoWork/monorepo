import type { Actions, PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { SMTPClient } from "emailjs";
import { env } from "../../env";
import { GetContactServerData } from "../../graphql/default/generated/gql";
import { mapSocial } from "../../shared/mapSocials";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage } = await parent();
    const { contact } = flattenTranslations(
        await toPromise(GetContactServerData({ variables: { language: currentLanguage.code } })),
    );
    const { socials, ...texts } = contact;

    return {
        texts,
        socials: socials.map(s => ({ ...mapSocial(s.socialItem), isSeeMore: s.isSeeMore })),
    };
};

const client = new SMTPClient({
    user: env.SMTP_USERNAME,
    password: env.SMTP_PASSWORD,
    host: env.SMTP_HOST,
    port: env.SMTP_PORT,
    tls: true,
});

interface Message {
    name: string;
    email: string;
    message: string;
}

export const actions: Actions = {
    mail: async event => {
        const data: Partial<Message> = {};
        const formData = await event.request.formData();
        formData.forEach((value, key) => (data[key as keyof Message] = value as string));
        const messageData = data as Message;

        try {
            const { name, email, message } = messageData;
            await client.sendAsync({
                text: `From: ${name} <${email}>\n\n ${message}`,
                from: `${name} <${email}>`,
                to: env.SMTP_USERNAME,
                subject: `[Just-Site] New Message from ${name}`,
            });
            return { success: true, msg: "Thank you for your message!" };
        } catch (err) {
            return { success: false, data: messageData, msg: err.toString() };
        }
    },
};
