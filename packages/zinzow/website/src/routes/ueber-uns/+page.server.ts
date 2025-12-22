import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetAboutDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";

export const load: PageServerLoad = async () => {
    const aboutData = await queryDefault({ query: GetAboutDataDocument });
    const { about } = aboutData;

    if (!about.isTeamVisible) {
        aboutData.teamMembers = [];
    }

    return {
        ...aboutData,
        about: {
            ...about,
            images: about.images.map(f =>
                directusImageParams({
                    ...defaultNull(f.directus_files_id),
                    alt: "about aside",
                    assetParams: { quality: 50, width: 720 },
                }),
            ),
            bannerImage: directusImageParams({
                ...defaultNull(about.bannerImage),
                alt: "about banner",
                assetParams: { width: 1_280, quality: 50 },
            }),
            aboutText: formatWYSIWYG(about.aboutText),
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
    };
};
