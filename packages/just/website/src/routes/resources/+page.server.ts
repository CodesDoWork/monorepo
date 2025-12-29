import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetResourcesServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { queryDefault } from "../../graphql/default/client";
import { GetResourcesServerDataDocument } from "../../graphql/default/generated/graphql";
import { replaceLinks } from "../../lib/server/replace-links";
import { createBreadcrumbList } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetResourcesServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { resources, sections } = flattenTranslations(data);

    sections.forEach(section => {
        section.description = replaceLinks(section.description);
        section.items.forEach(item => {
            item.file = assetUrl(item.file, { format: "original" });
        });
    });

    const jsonLdThings = createJsonLdThings(parentData, sections);

    return { resources, sections, jsonLdThings };
};

function createJsonLdThings(
    parentData: LayoutServerData,
    sections: FlatTrans<GetResourcesServerDataQuery>["sections"],
): Thing[] {
    const { currentRoute, homeRoute, siteInfo } = parentData;
    const documentThings: Thing[] = sections.flatMap(section =>
        section.items.map(item => ({
            "@type": "DigitalDocument",
            name: item.title,
            description: item.description,
            inLanguage: "en",
            url: item.file,
            author: {
                "@type": "Person",
                name: siteInfo.name,
            },
        })),
    );

    return [...documentThings, createBreadcrumbList(currentRoute, homeRoute)];
}
