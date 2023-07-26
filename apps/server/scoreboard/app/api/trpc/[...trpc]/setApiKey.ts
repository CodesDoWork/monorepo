import { Client } from "@notionhq/client";
import { encrypt } from "shared/node/crypto";
import { env } from "../../../env";
import { User } from "../../../../db/user";
import { getSessionUser } from "./getUser";

export const setApiKey = async (key: string): Promise<boolean> => {
    const notion = new Client({
        auth: key,
    });

    const isValidKey = await notion.users
        .me({})
        .then(() => true)
        .catch(() => false);

    if (isValidKey) {
        const { email, username } = await getSessionUser();
        const notionApiKey = encrypt(key, env.SECRET_KEY);
        await User.upsert({ email, username, notionApiKey });
    }

    return isValidKey;
};
