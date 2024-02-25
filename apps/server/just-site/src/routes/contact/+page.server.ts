import type { Actions } from "./$types/Actions";
import { SMTP_HOST, SMTP_PASSWORD, SMTP_PORT, SMTP_USER } from "$env/static/private";
import { SMTPClient } from "emailjs";
import { config } from "../../config";

const client = new SMTPClient({
    user: SMTP_USER,
    password: SMTP_PASSWORD,
    host: SMTP_HOST,
    port: SMTP_PORT,
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
            const mailResult = await client.sendAsync({
                text: `From: ${name} <${email}>\n\n ${message}`,
                from: `${name} <${email}>`,
                to: `${config.contact.name} <${config.contact.email}>`,
                subject: `[Just-Site] New Message from ${name}`,
            });
            console.log(mailResult);
            return { success: true, msg: "Thank you for your message!" };
        } catch (err) {
            console.error(err);
            return { success: false, data: messageData, msg: err.toString() };
        }
    },
};
