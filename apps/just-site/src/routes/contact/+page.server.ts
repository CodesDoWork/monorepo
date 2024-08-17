import { SMTPClient } from "emailjs";
import { env } from "../../env";
import type { Actions } from "./$types";

const client = new SMTPClient({
    user: env.SMTP_USER,
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

export interface MailResult {
    success: boolean;
    data?: Message;
    msg?: string;
}

export const actions: Actions = {
    mail: async function (event): Promise<MailResult> {
        const data: Partial<Message> = {};
        const formData = await event.request.formData();
        formData.forEach((value, key) => (data[key as keyof Message] = value as string));
        const messageData = data as Message;
        const { name, email, message } = messageData;

        return client
            .sendAsync({
                text: `From: ${name} <${email}>\n\n ${message}`,
                from: `${name} <${email}>`,
                to: env.SMTP_USER,
                subject: `[Just-Site] New Message from ${name}`,
            })
            .then(() => ({ success: true, msg: "Thank you for your message!" }))
            .catch(err => ({
                success: false,
                data: messageData,
                msg: err.toString(),
            }));
    },
};
