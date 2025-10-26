import type { PageServerLoad } from "./$types";
import { error } from "@sveltejs/kit";
import { GetHomeSystemDataDocument } from "../graphql/system/generated/graphql";
import { getAssetUrl } from "../utils/assets";
import { getPageIdPrefix } from "../utils/graphql/translations";
import { getTextsFromTranslations } from "../utils/translations";
import { systemClient } from "../graphql/system/client";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = getPageIdPrefix("home");

    const { data } = await systemClient.query({
        query: GetHomeSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { files, translations } = data;

    const file = files[0];
    if (!file) {
        return error(500, "No hero image found");
    }

    return {
        heroImage: getAssetUrl(file.id),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
