import type { Thing } from "schema-dts";
import type { LayoutServerData, PageServerLoad } from "./$types";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const jsonLdThings = createJsonLdThings(parentData);

    return { jsonLdThings };
};

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentLanguage, homeRoute, baseUrl } = parentData;

    return [
        {
            "@type": "WebPage",
            inLanguage: currentLanguage.short,
            isPartOf: {
                "@type": "WebSite",
                url: `${baseUrl}${homeRoute.route}`,
            },
        },
    ];
}
