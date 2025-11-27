import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
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

    const landscapeHeros = heroFiles
        .filter(f => f.width > f.height)
        .map(f => assetUrl(f.id, { quality: 50, width: 1_280 }));
    const portraitHeros = heroFiles
        .filter(f => f.height > f.width)
        .map(f => assetUrl(f.id, { quality: 50, width: 720 }));

    return {
        landscapeHeros,
        portraitHeros,
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
