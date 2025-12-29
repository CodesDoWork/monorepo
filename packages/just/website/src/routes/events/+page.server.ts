import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetEventsServerDataQuery } from "../../graphql/default/generated/graphql";
import type { Route } from "../types";
import type { PageServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { byField, byId } from "@cdw/monorepo/shared-utils/filters";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { queryDefault } from "../../graphql/default/client";
import { GetEventsServerDataDocument } from "../../graphql/default/generated/graphql";
import { createBreadcrumbList } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage, serverRoutes, routes } = parentData;

    const data = await queryDefault({
        query: GetEventsServerDataDocument,
        variables: { language: currentLanguage.code },
    });
    const { events, texts } = flattenTranslations(data);

    const projectRouteId = serverRoutes.find(byField("route", "/projects"))?.id;
    const projectRoute = routes.find(byId(projectRouteId));

    const transformedEvents = transformEvents(events, projectRoute);
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

    const jsonLdThings = createJsonLdThings(parentData, transformedEvents);

    return { events: transformedEvents, texts, jsonLdThings };
};

function transformEvents(
    events: FlatTrans<GetEventsServerDataQuery["events"]>,
    projectRoute: Route,
) {
    return events.map(e => ({
        ...e,
        projects: e.projects.map(({ project: { thumbnail, ...project } }) => ({
            ...project,
            logo: assetUrl(thumbnail, { quality: 15 }),
            href: `${projectRoute.route}#_${project.id}`,
        })),
        links: e.links.map(({ link }) => link),
        technologies: e.technologies.map(({ technology }) => technology),
        logo: assetUrl(e.logo, { quality: 20 }),
        startDate: new Date(e.startDate as unknown as string),
        endDate: new Date(e.endDate as unknown as string),
        images: e.images.map(({ fileId }) => assetUrl(fileId, { quality: 60 })),
    }));
}

function createJsonLdThings(
    parentData: LayoutServerData,
    events: ReturnType<typeof transformEvents>,
): Thing[] {
    const { currentRoute, homeRoute, currentLanguage } = parentData;
    const eventThings: Thing[] = events.map(event => ({
        "@type": "Event",
        name: event.title,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        description: event.description,
        image: [event.logo, ...event.images],
        location: event.location,
        inLanguage: currentLanguage.short,
    }));

    return [...eventThings, createBreadcrumbList(currentRoute, homeRoute)];
}
