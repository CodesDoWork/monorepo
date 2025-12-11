import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetAboutDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetAboutSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.about.";

    const aboutData = await queryDefault({ query: GetAboutDataDocument });
    const { about } = aboutData;
    const { translations } = await querySystem({
        query: GetAboutSystemDataDocument,
        variables: { pageIdPrefix },
    });

    return {
        ...aboutData,
        about: {
            ...about,
            images: about.images.map(f =>
                directusImageParams({ ...defaultNull(f.directus_files_id), alt: "about aside" }),
            ),
            bannerImage: directusImageParams({
                ...defaultNull(about.bannerImage),
                alt: "about banner",
            }),
            partners: about.partners?.map(f =>
                directusImageParams({ ...defaultNull(f.directus_files_id), alt: "partner" }),
            ),
        },
        teamMembers: aboutData.teamMembers.map(member => ({
            ...member,
            portrait: member.portrait
                ? directusImageParams({
                      ...defaultNull(member.portrait),
                      alt: "team member",
                      assetParams: { width: 256, quality: 50 },
                  })
                : null,
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
