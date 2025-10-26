import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetAboutServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { defaultClient } from "../../graphql/default/client";
import { GetAboutServerDataDocument } from "../../graphql/default/generated/graphql";
import { replaceLinks } from "../../lib/server/replace-links";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { createBreadcrumbList, domainUrl } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const { data } = await defaultClient.query({
        query: GetAboutServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { about, workExperience, ...rest } = flattenTranslations(data);

    const techStack = buildTechStack(about.technologies);

    const transformedExperiences = transformWorkExperiences(workExperience);
    about.bio = replaceLinks(about.bio);
    about.portrait = assetUrl(about.portrait, { quality: 67, width: 400, height: 400 });

    const jsonLdThings = createJsonLdThings(parentData);

    return { about, workExperiences: transformedExperiences, techStack, ...rest, jsonLdThings };
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
        (e1, e2) => (e1.endYear || 1) - (e2.endYear || 1) || e2.startYear - e1.startYear,
    );

    return workExperience.map(e => ({
        ...e,
        company: { ...e.company, logo: assetUrl(e.company.logo, { quality: 20 }) },
        projects: e.projects.map(({ project }) => ({
            ...project,
            logo: assetUrl(project.logo, { quality: 15 }),
        })),
        technologies: e.technologies.map(({ technology }) => technology),
    }));
}

function createJsonLdThings(parentData: LayoutServerData): Thing[] {
    const { currentRoute, currentLanguage, homeRoute } = parentData;
    return [
        {
            "@type": "AboutPage",
            name: currentRoute.name,
            description: currentRoute.description,
            url: domainUrl(currentRoute),
            inLanguage: currentLanguage.short,
        },
        createBreadcrumbList(currentRoute, homeRoute),
    ];
}
