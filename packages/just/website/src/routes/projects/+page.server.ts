import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetProjectsServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { defaultClient } from "../../graphql/default/client";
import { GetProjectsServerDataDocument } from "../../graphql/default/generated/graphql";
import { assetUrl } from "../../shared/assets";
import { createBreadcrumbList, domainUrl } from "../../shared/urls";

type Projects = FlatTrans<GetProjectsServerDataQuery["projects"]>;

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const { data } = await defaultClient.query({
        query: GetProjectsServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { projects, texts } = flattenTranslations(data);

    transformProjects(projects);
    const jsonLdThings = createJsonLdThings(parentData, projects);

    return { projects, texts, jsonLdThings };
};

function transformProjects(projects: Projects) {
    projects.forEach(project => {
        project.thumbnail = assetUrl(project.thumbnail, { quality: 33 });
        project.technologies.sort((t1, t2) => t1.technology.name.localeCompare(t2.technology.name));
        if (project.children) {
            transformProjects(project.children);
        }
    });
}

function createJsonLdThings(parent: LayoutServerData, projects: Projects): Thing[] {
    const { currentRoute, currentLanguage, siteInfo, homeRoute } = parent;

    const projectThings: Thing[] = projects.map(project => ({
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.description,
        url: `${domainUrl(currentRoute)}#_${project.id}`,
        codeRepository: project.githubUrl,
        license: project.license,
        programmingLanguage: project.technologies.map(t => t.technology.name),
        keywords: project.technologies.map(t => t.technology.name),
        image: project.thumbnail,
        author: {
            "@type": "Person",
            name: siteInfo.name,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            name: currentRoute.name,
            description: currentRoute.description,
            url: domainUrl(currentRoute),
            inLanguage: currentLanguage.short,
            isPartOf: {
                "@type": "WebSite",
                url: domainUrl(homeRoute),
            },
        },
    }));

    return [...projectThings, createBreadcrumbList(currentRoute, homeRoute)];
}
