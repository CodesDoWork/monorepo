import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetAboutDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async () => {
    const aboutData = await queryDefault({ query: GetAboutDataDocument });
    const { about } = aboutData;

    if (!about.isTeamVisible) {
        aboutData.teamMembers = [];
    }

    const teamMembers = aboutData.teamMembers.map(member => ({
        ...member,
        portrait: member.portrait
            ? directusImageParams(env.CMS_URL, {
                  ...defaultNull(member.portrait),
                  alt: "team member",
                  assetParams: { width: 256, quality: 50 },
              })
            : null,
    }));

    return {
        ...aboutData,
        about: {
            ...about,
            images: about.images.map(f =>
                directusImageParams(env.CMS_URL, {
                    ...defaultNull(f.directus_files_id),
                    alt: "about aside",
                    assetParams: { quality: 50, width: 720 },
                }),
            ),
            bannerImage: directusImageParams(env.CMS_URL, {
                ...defaultNull(about.bannerImage),
                alt: "about banner",
                assetParams: { width: 1_280, quality: 50 },
            }),
            aboutText: formatWYSIWYG(stylesMap, about.aboutText),
        },
        teamMembers,
        jsonLdThings: createJsonLdThings({ stats: aboutData.stats, teamMembers }),
    };
};

interface JsonLdData {
    stats: {
        name: string;
        value: string;
    }[];
    teamMembers: {
        forename: string;
        surname?: string;
        position?: string;
        portrait?: DirectusImageParams;
    }[];
}

function createJsonLdThings({ stats, teamMembers }: JsonLdData): Thing[] {
    return [
        {
            "@type": "AboutPage",
            mainEntity: {
                "@id": `${env.URL}/#organization`,
            },
        },
        ...stats.map(
            s =>
                ({
                    "@type": "QuantitativeValue",
                    name: s.name,
                    unitText: s.name,
                    value: s.value,
                }) satisfies Thing,
        ),
        ...teamMembers.map(
            member =>
                ({
                    "@type": "Person",
                    name: member.surname ? `${member.forename} ${member.surname}` : member.forename,
                    jobTitle: member.position,
                    image: member.portrait?.src,
                    worksFor: {
                        "@id": `${env.URL}/#organization`,
                    },
                }) satisfies Thing,
        ),
    ];
}
