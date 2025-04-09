import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { GetEventsServerDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetEventsServerData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage, serverRoutes, routes } = await parent();
    const { events } = flattenTranslations(
        await toPromise(GetEventsServerData({ variables: { language: currentLanguage.code } })),
    );

    const transformedEvents = transformEvents(events);
    transformedEvents.sort(
        (e1, e2) =>
            e2.endDate.getTime() - e1.endDate.getTime() ||
            e2.startDate.getTime() - e1.startDate.getTime(),
    );
    transformedEvents.forEach(e => {
        e.projects.sort((p1, p2) => p1.name.localeCompare(p2.name));
        e.links.sort((l1, l2) => l1.title.localeCompare(l2.title));
        e.technologies.sort((t1, t2) => t1.name.localeCompare(t2.name));
    });

    const projectRouteId = serverRoutes.find(r => r.route === "/projects")?.id;
    const projectRoute = routes.find(r => r.id === projectRouteId);

    return { events: transformedEvents, projectRoute };
};

function transformEvents(events: FlatTrans<GetEventsServerDataQuery["events"]>) {
    return events.map(e => ({
        ...e,
        projects: e.projects.map(({ project: { thumbnail, ...project } }) => ({
            ...project,
            logo: assetUrl(thumbnail),
        })),
        links: e.links.map(({ link }) => link),
        technologies: e.technologies.map(({ technology }) => technology),
        logo: assetUrl(e.logo),
        startDate: new Date(e.startDate as unknown as string),
        endDate: new Date(e.endDate as unknown as string),
        images: e.images.map(({ fileId }) => assetUrl(fileId)),
    }));
}
