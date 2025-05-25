import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetResourcesServerDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetResourcesServerData } from "../../graphql/default/generated/gql";
import { replaceLinks } from "../../lib/server/replace-links";
import { assetUrl } from "../../shared/assets";
import { createBreadcrumbList } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;
    const { resources, sections } = flattenTranslations(
        await toPromise(GetResourcesServerData({ variables: { language: currentLanguage.code } })),
    );

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
