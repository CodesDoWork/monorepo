import { TRPCError } from "@trpc/server";
import { GetDatabaseResponse, PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getDBTitle, getNotionClient, getSelectedDB } from "./utils";
import { Client } from "@notionhq/client";

export const getDatabase = async () => {
    const notion = await getNotionClient();
    const id = await getSelectedDB();

    const db = await notion.databases.retrieve({ database_id: id });
    const name = getDBTitle(db);

    const datePropertyKey = findDateProperty(db);
    const properties = findNumberProperties(db);

    const pages = await queryDatabasePages(notion, id);

    return {
        name,
        dateProperty: datePropertyKey,
        properties,
        pages,
    };
};

const findDateProperty = (db: GetDatabaseResponse) => {
    const dateProperty = Object.entries(db.properties).find(([, value]) => value.type === "date");
    if (!dateProperty) {
        throw new TRPCError({ message: "Date column missing in database!", code: "BAD_REQUEST" });
    }

    return dateProperty[0];
};

const findNumberProperties = (db: GetDatabaseResponse) =>
    Object.entries(db.properties)
        .filter(([, value]) => value.type === "number")
        .map(([key]) => key);

const queryDatabasePages = (notion: Client, id: string) =>
    notion.databases.query({ database_id: id }).then(res => res.results as PageObjectResponse[]);
