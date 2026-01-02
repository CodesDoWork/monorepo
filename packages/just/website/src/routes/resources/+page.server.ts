import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetResourcesServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-directus";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetResourcesServerDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetResourcesServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { resources, sections: translatedSections } = flattenTranslations(data);

    const sections = translatedSections.map(transformSection);
    const jsonLdThings = createJsonLdThings(parentData, sections);

    return { resources, sections, jsonLdThings };
};

function transformSection(section: FlatTrans<GetResourcesServerDataQuery>["sections"][0]) {
    return {
        ...section,
        description: formatWYSIWYG(stylesMap, section.description),
        items: section.items.map(item => ({
            ...item,
            file: assetUrl(env.CMS_URL, item.file.id, { download: true }),
        })),
    };
}

function createJsonLdThings(
    parentData: LayoutServerData,
    sections: ReturnType<typeof transformSection>[],
): Thing[] {
    const { siteInfo } = parentData;
    return sections.flatMap(section =>
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
}
