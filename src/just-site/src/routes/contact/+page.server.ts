import { SMTPClient } from "emailjs";
import { env } from "../../env";
import type { Actions } from "./$types/Actions";

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
        const data = {};
        const formData = await event.request.formData();
        formData.forEach((value, key) => (data[key] = value));
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
