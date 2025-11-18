import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { defaultClient } from "../../graphql/default/client";
import { GetImpressionsDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetImpressionsSystemDataDocument } from "../../graphql/system/generated/graphql";
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
                .map(image => ({
                    ...image,
                    url: assetUrl(image.id),
                    tags: image.tags as string[] | null,
                })),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
