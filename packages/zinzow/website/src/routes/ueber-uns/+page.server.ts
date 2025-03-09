import type { PageServerLoad } from "./$types";
import { GetAboutData } from "../../graphql/default/generated/gql";
import { GetAboutSystemData } from "../../graphql/system/generated/gql";
import { getAssetUrl } from "../../utils/assets";
import { toPromise } from "../../utils/graphql/apollo";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.about.";
    const { about } = await toPromise(GetAboutData({}));
    const { translations } = await toPromise(GetAboutSystemData({ variables: { pageIdPrefix } }));

    return {
        about: {
            ...about,
            images: about.images.map(file => getAssetUrl(file.directus_files_id.id)),
            bannerImage: getAssetUrl(about.bannerImage.id),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
