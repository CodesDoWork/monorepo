import { Database } from "../../../../../types/types";
import { Client } from "@notionhq/client";
import { GetDatabaseResponse } from "@notionhq/client/build/src/api-endpoints";
import { getDBTitle, getNotionClient } from "./utils";

export const getDatabases = async (): Promise<Database[]> => {
    const notion = await getNotionClient();
    const dbIds = await notion
        .search({ filter: { property: "object", value: "database" } })
        .then(res => res.results.map(result => result.id));

    return Promise.all(dbIds.map(id => getDB(notion, id))).then(results => results.map(toDatabase));
};

const getDB = (notion: Client, id: string) => notion.databases.retrieve({ database_id: id });

const toDatabase = (res: GetDatabaseResponse): Database => ({
    id: res.id,
    title: getDBTitle(res),
});
