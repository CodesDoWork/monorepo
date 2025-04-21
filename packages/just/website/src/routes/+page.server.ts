import type { Thing } from "schema-dts";
import type { LayoutServerData, PageServerLoad } from "./$types";
import { domainUrl } from "../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const jsonLdThings = createJsonLdThings(parentData);

    return { jsonLdThings };
};

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentRoute, currentLanguage, homeRoute } = parentData;

    return [
        {
            "@type": "WebPage",
            name: currentRoute.name,
            description: currentRoute.description,
            url: domainUrl(currentRoute),
            inLanguage: currentLanguage.short,
            isPartOf: {
                "@type": "WebSite",
                url: domainUrl(homeRoute),
            },
        },
    ];
}
