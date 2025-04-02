import type { Actions, PageServerLoad } from "./$types";
import { SMTPClient } from "emailjs";
import { env } from "../../env";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { GetContactServerData } from "../../graphql/default/generated/gql";
import { mapSocials } from "../../shared/mapSocials";

export const load: PageServerLoad = async () => {
    const { contact } = await toPromise(GetContactServerData({}));
    return { socials: mapSocials(contact.socials.map(s => s.socials_id)) };
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
