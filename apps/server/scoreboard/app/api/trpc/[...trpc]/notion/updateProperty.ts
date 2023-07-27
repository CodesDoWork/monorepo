import { getIsoDate } from "shared/web/utils";
import { TRPCError } from "@trpc/server";
import { getNotionClient, getSelectedDB } from "./utils";
import { getDatabase } from "./getDatabase";
import { Client } from "@notionhq/client";
import { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const updateProperty = async (propName: string, add: number): Promise<number> => {
    const notion = await getNotionClient();
    const dbId = await getSelectedDB();
    const { dateProperty, pages } = await getDatabase();
    const today = getIsoDate(new Date());

    const todayPage = findTodayPage(pages, dateProperty, today);
    const value = getUpdatedValue(todayPage, propName, add);
    const todayPageId = await ensureTodayPageExists(notion, todayPage, dbId, dateProperty, today);

    await updatePageProperties(notion, todayPageId, propName, value);

    return value;
};

const findTodayPage = (pages: PageObjectResponse[], dateProperty: string, today: string) =>
    pages.find(page => isTodayPage(page, dateProperty, today));

const isTodayPage = (page: PageObjectResponse, dateProperty: string, today: string) => {
    const dateProp = page.properties[dateProperty];
    if (!("date" in dateProp)) {
        throw new TRPCError({ message: "Invalid date property", code: "INTERNAL_SERVER_ERROR" });
    }

    return dateProp.date?.start === today;
};

const getUpdatedValue = (
    todayPage: PageObjectResponse | undefined,
    propName: string,
    add: number,
) => {
    const prop = todayPage?.properties[propName];
    if (prop && !("number" in prop)) {
        throw new TRPCError({ message: "Invalid number property", code: "BAD_REQUEST" });
    }

    return Math.max(0, (prop?.number ?? 0) + add);
};

const ensureTodayPageExists = async (
    notion: Client,
    todayPage: PageObjectResponse | undefined,
    dbId: string,
    dateProperty: string,
    today: string,
) => {
    let todayPageId = todayPage?.id;
    if (!todayPageId) {
        todayPageId = await createTodayPage(notion, dbId, dateProperty, today);
    }

    return todayPageId;
};

const createTodayPage = (notion: Client, dbId: string, dateProperty: string, today: string) =>
    notion.pages
        .create({
            parent: { database_id: dbId },
            properties: { [dateProperty]: { date: { start: today } } },
        })
        .then(res => res.id);

const updatePageProperties = (
    notion: Client,
    todayPageId: string,
    propName: string,
    value: number,
) =>
    notion.pages.update({
        page_id: todayPageId,
        properties: { [propName]: { number: value } },
    });
