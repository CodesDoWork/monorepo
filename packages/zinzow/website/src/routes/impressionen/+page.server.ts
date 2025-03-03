import type { PageServerLoad } from "./$types";
import { GetImpressionsData } from "../../graphql/default/generated/gql";
import { GetImpressionsSystemData } from "../../graphql/system/generated/gql";
import { getAssetUrl } from "../../utils/assets";
import { toPromise } from "../../utils/graphql";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.impressions.";
    const { impressions } = await toPromise(GetImpressionsData({}));
    const { translations } = await toPromise(
        GetImpressionsSystemData({ variables: { pageIdPrefix } }),
    );

    return {
        impressions: {
            ...impressions,
            images: impressions.images
                .map(file => file.directus_files_id)
                .map(image => ({
                    ...image,
                    url: getAssetUrl(image.id),
                    tags: image.tags as string[] | null,
                })),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
