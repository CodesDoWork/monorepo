import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { defaultClient } from "../../graphql/default/client";
import { GetAboutDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetAboutSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
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
            images: about.images.map(f =>
                directusImageParams({ ...defaultNull(f.directus_files_id), alt: "about aside" }),
            ),
            bannerImage: directusImageParams({
                ...defaultNull(about.bannerImage),
                alt: "about banner",
            }),
        },
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
