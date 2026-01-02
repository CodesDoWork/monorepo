import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetProjectsServerDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetProjectsServerDataDocument } from "../../graphql/default/generated/graphql";

type Projects = FlatTrans<GetProjectsServerDataQuery["projects"]>;

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetProjectsServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { projects: translatedProjects, texts } = flattenTranslations(data);

    const projects = transformProjects(translatedProjects);
    const jsonLdThings = createJsonLdThings(parentData, projects);

    return { projects, texts, jsonLdThings };
};

interface Project {
    id: string;
    name: string;
    description: string;
    license?: string;
    homepage?: string;
    githubUrl?: string;
    thumbnail: DirectusImageParams;
    technologies?: {
        technology?: {
            name: string;
            icon: string;
        };
    }[];
    children?: Project[];
}

function transformProjects(projects: Projects): Project[] {
    return projects.map(
        p =>
            ({
                ...p,
                thumbnail: directusImageParams(env.CMS_URL, {
                    ...defaultNull(p.thumbnail),
                    alt: "project thumbnail",
                    assetParams: { width: 512, quality: 67 },
                }),
                technologies: p.technologies.sort((t1, t2) =>
                    t1.technology.name.localeCompare(t2.technology.name),
                ),
                children: p.children ? transformProjects(p.children) : undefined,
            }) satisfies Project,
    );
}

function createJsonLdThings(parent: LayoutServerData, projects: Project[]): Thing[] {
    const { currentLanguage, siteInfo, homeRoute, baseUrl } = parent;
    return projects.map(project => ({
        "@type": "SoftwareSourceCode",
        name: project.name,
        description: project.description,
        codeRepository: project.githubUrl,
        license: project.license,
        programmingLanguage: project.technologies.map(t => t.technology.name),
        keywords: project.technologies.map(t => t.technology.name),
        image: project.thumbnail.src,
        author: {
            "@type": "Person",
            name: siteInfo.name,
        },
        mainEntityOfPage: {
            "@type": "WebPage",
            inLanguage: currentLanguage.short,
            isPartOf: {
                "@type": "WebSite",
                url: `${baseUrl}${homeRoute.route}`,
            },
        },
    }));
}
