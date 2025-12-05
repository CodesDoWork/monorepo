import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { defaultClient } from "../../graphql/default/client";
import { GetImpressionsDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetImpressionsSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.impressions.";

    const { data: impressionsData } = await defaultClient.query({
        query: GetImpressionsDataDocument,
    });
    const { impressions } = impressionsData;
    const { data: translationsData } = await systemClient.query({
        query: GetImpressionsSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations } = translationsData;

    return {
        impressions: {
            ...impressions,
            images: impressions.images
                .map(file => file.directus_files_id)
                .map(f => ({
                    ...f,
                    ...directusImageParams({ ...defaultNull(f), alt: "impression" }),
                    tags: f.tags as string[] | null,
                })),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
