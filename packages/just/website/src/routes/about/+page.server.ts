import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetAboutServerDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetAboutServerData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";
import { createBreadcrumbList, domainUrl } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;
    const { about, workExperience, ...rest } = flattenTranslations(
        await toPromise(GetAboutServerData({ variables: { language: currentLanguage.code } })),
    );

    const techStack = buildTechStack(about.technologies);

    const transformedExperiences = transformWorkExperiences(workExperience);
    about.bio = replaceLinks(about.bio);

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

function replaceLinks(text: string) {
    return text.replace(/<a /g, '<a class="text-[var(--page-color)] hover:underline" ');
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
