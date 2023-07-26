import { Client } from "@notionhq/client";
import { Database } from "../../../../types/types";
import { GetDatabaseResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getUser } from "./getUser";
import { TRPCError } from "@trpc/server";
import { decrypt } from "shared/node/crypto";
import { env } from "../../../env";

export const getDatabases = async (): Promise<Database[]> => {
    const notion = await getNotionClient();
    const dbIds = await notion
        .search({ filter: { property: "object", value: "database" } })
        .then(res => res.results.map(result => result.id));

    return Promise.all(dbIds.map(id => getDB(notion, id))).then(results => results.map(toDatabase));
};

export const getDatabase = async (): Promise<PageObjectResponse[]> => {
    const notion = await getNotionClient();
    const id = await getSelectedDB();

    return notion.databases
        .query({ database_id: id })
        .then(res => res.results as PageObjectResponse[]);
};

const getNotionClient = async () =>
    new Client({
        auth: await getApiKey(),
    });

const getApiKey = async (): Promise<string> => {
    const { notionApiKey } = await getUser();
    if (!notionApiKey) {
        throw new TRPCError({ message: "Notion API Key not found", code: "BAD_REQUEST" });
    }

    return decrypt(notionApiKey, env.SECRET_KEY);
};

const getSelectedDB = async () => {
    const { selectedDB } = await getUser();
    if (!selectedDB) {
        throw new TRPCError({ message: "Selected DB not found", code: "BAD_REQUEST" });
    }

    return selectedDB;
};

const getDB = (notion: Client, id: string) => notion.databases.retrieve({ database_id: id });

const toDatabase = (res: GetDatabaseResponse): Database => ({
    id: res.id,
    title: getTitle(res),
});

const getTitle = (res: GetDatabaseResponse): string => (res as any).title[0].plain_text;
