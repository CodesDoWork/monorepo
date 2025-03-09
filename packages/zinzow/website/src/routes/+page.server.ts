import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { GetHomeSystemData } from "../graphql/system/generated/gql";
import { getAssetUrl } from "../utils/assets";
import { toPromise } from "../utils/graphql/apollo";
import { getPageIdPrefix } from "../utils/graphql/translations";
import { getTextsFromTranslations } from "../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = getPageIdPrefix("home");
    const { files, translations } = await toPromise(
        GetHomeSystemData({ variables: { pageIdPrefix } }),
    );

    const file = files[0];
    if (!file) {
        return error(500, "No hero image found");
    }

    return {
        heroImage: getAssetUrl(file.id),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
