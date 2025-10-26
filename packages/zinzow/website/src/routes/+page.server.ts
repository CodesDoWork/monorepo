import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { error } from "@sveltejs/kit";
import { systemClient } from "../graphql/system/client";
import { GetHomeSystemDataDocument } from "../graphql/system/generated/graphql";
import { getPageIdPrefix } from "../utils/graphql/translations";
import { getTextsFromTranslations } from "../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = getPageIdPrefix("home");

    const { data } = await systemClient.query({
        query: GetHomeSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { heroFiles, translations } = data;

    const heroImages = heroFiles.filter(f =>
        [
            "257a1e9b-d3d4-4908-85a7-93e52c0a8d09",
            "abea4d2a-de3b-4be2-80fa-0e3282254e69",
            "ea40bec8-cabe-4604-94bd-7d38243e15cc",
            "62617290-3b58-485d-b351-4296cb76441a",
        ].includes(f.id),
    );
    if (!heroImages.length) {
        return error(500, "No hero image found");
    }

    return {
        heroImages: heroImages.map(f => assetUrl(f.id, { quality: 50, width: 1920 / 2 })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
