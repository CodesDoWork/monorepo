import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetAboutServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetAboutServerDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetAboutServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { about, workExperience, ...rest } = flattenTranslations(data);

    const techStack = buildTechStack(about.technologies);

    const transformedExperiences = transformWorkExperiences(workExperience);
    about.bio = formatWYSIWYG(stylesMap, about.bio);

    const jsonLdThings = createJsonLdThings(parentData);

    return {
        about: {
            ...about,
            portrait: directusImageParams(env.CMS_URL, {
                ...defaultNull(about.portrait),
                alt: "portrait",
                assetParams: {
                    quality: 67,
                    width: 400,
                    height: 400,
                },
            }),
            portraitMobile: directusImageParams(env.CMS_URL, {
                ...defaultNull(about.portrait),
                alt: "portrait",
                assetParams: {
                    quality: 67,
                    width: 256,
                    height: 256,
                },
            }),
        },
        workExperiences: transformedExperiences,
        techStack,
        ...rest,
        jsonLdThings,
    };
};

function buildTechStack(
    technologies: FlatTrans<GetAboutServerDataQuery["about"]["technologies"]>,
): Record<string, FlatTrans<GetAboutServerDataQuery["about"]["technologies"]>> {
    const techStacks: string[] = [];
    technologies.sort((a, b) => a.technology.name.localeCompare(b.technology.name));
    technologies.forEach(t =>
        t.technology.techStacks.forEach(ts => techStacks.push(ts.techStack.name)),
    );

    techStacks.sort((a, b) => a.localeCompare(b));
    return techStacks.reduce(
        (all, stack) => ({
            ...all,
            [stack]: technologies.filter(t =>
                t.technology.techStacks.find(ts => ts.techStack.name === stack),
            ),
        }),
        {},
    );
}

function transformWorkExperiences(
    workExperience: FlatTrans<GetAboutServerDataQuery["workExperience"]>,
) {
    workExperience.sort(
        (e1, e2) =>
            (e1.endYear && e2.endYear && e2.endYear - e1.endYear) || e2.startYear - e1.startYear,
    );

    return workExperience.map(e => ({
        ...e,
        company: {
            ...e.company,
            logo: directusImageParams(env.CMS_URL, {
                ...defaultNull(e.company.logo),
                alt: "company logo",
                assetParams: { width: 128, quality: 30 },
            }),
        },
        projects: e.projects.map(({ project }) => ({
            ...project,
            logo: directusImageParams(env.CMS_URL, {
                ...defaultNull(project.logo),
                alt: "project logo",
                assetParams: { width: 64, quality: 50 },
            }),
        })),
        technologies: e.technologies.map(({ technology }) => technology),
    }));
}

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentLanguage } = parentData;
    return [
        {
            "@type": "AboutPage",
            inLanguage: currentLanguage.short,
        },
    ];
}
