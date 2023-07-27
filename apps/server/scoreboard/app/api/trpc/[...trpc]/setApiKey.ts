import { Client } from "@notionhq/client";
import { encrypt } from "shared/node/crypto";
import { env } from "../../../env";
import { User } from "../../../../db/user";
import { getSessionUser } from "./getUser";

export const setApiKey = async (key: string): Promise<boolean> => {
    let isValidKey = true;
    if (key) {
        const notion = new Client({
            auth: key,
        });

        isValidKey = await notion.users
            .me({})
            .then(() => true)
            .catch(() => false);
    }

    if (isValidKey) {
        const { email, username } = await getSessionUser();
        const notionApiKey = key ? encrypt(key, env.SECRET_KEY) : null;
        await User.upsert({ email, username, notionApiKey });
    }

    return isValidKey;
};
