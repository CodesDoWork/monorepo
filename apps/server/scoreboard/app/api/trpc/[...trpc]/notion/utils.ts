import { Client } from "@notionhq/client";
import { getUser } from "../getUser";
import { TRPCError } from "@trpc/server";
import { decrypt } from "shared/node/crypto";
import { env } from "../../../../env";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";

export const getNotionClient = async () =>
    new Client({
        auth: await getApiKey(),
    });

export const getApiKey = async (): Promise<string> => {
    const { notionApiKey } = await getUser();
    if (!notionApiKey) {
        throw new TRPCError({ message: "Notion API Key not found", code: "BAD_REQUEST" });
    }

    return decrypt(notionApiKey, env.SECRET_KEY);
};

export const getSelectedDB = async () => {
    const { selectedDB } = await getUser();
    if (!selectedDB) {
        throw new TRPCError({ message: "Selected DB not found", code: "BAD_REQUEST" });
    }

    return selectedDB;
};

export const getDBTitle = (res: GetDatabaseResponse): string => (res as any).title[0].plain_text;
