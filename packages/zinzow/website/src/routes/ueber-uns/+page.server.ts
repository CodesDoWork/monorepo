import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { defaultClient } from "../../graphql/default/client";
import { GetAboutDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetAboutSystemDataDocument } from "../../graphql/system/generated/graphql";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.about.";

    const { data: aboutData } = await defaultClient.query({ query: GetAboutDataDocument });
    const { about } = aboutData;
    const { data: translationsData } = await systemClient.query({
        query: GetAboutSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations } = translationsData;

    return {
        about: {
            ...about,
            images: about.images.map(file => assetUrl(file.directus_files_id.id)),
            bannerImage: assetUrl(about.bannerImage.id),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
