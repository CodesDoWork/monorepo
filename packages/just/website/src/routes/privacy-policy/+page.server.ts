import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { queryDefault } from "../../graphql/default/client";
import { GetPrivacyPolicyServerDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetPrivacyPolicyServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { privacyPolicy } = flattenTranslations(data);

    const jsonLdThings = createJsonLdThings(parentData);

    return { html: formatWYSIWYG(stylesMap, privacyPolicy.html), jsonLdThings };
};

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentLanguage } = parentData;

    return [
        {
            "@type": "WebPage",
            inLanguage: currentLanguage.short,
            isPartOf: {
                "@type": "WebSite",
            },
        },
    ];
}
