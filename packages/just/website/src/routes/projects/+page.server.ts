import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { GetProjectsServerDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetProjectsServerData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage } = await parent();
    const { projects } = flattenTranslations(
        await toPromise(GetProjectsServerData({ variables: { language: currentLanguage.code } })),
    );

    transformProjects(projects);

    return { projects };
};

function transformProjects(projects: FlatTrans<GetProjectsServerDataQuery["projects"]>) {
    projects.forEach(project => {
        project.thumbnail = assetUrl(project.thumbnail);
        project.technologies.sort((t1, t2) => t1.technology.name.localeCompare(t2.technology.name));
        if (project.children) {
            transformProjects(project.children);
        }
    });
}
