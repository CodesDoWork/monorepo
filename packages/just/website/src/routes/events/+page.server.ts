import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetEventsServerDataQuery } from "../../graphql/default/generated/graphql";
import type { Route } from "../types";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { byField, byId } from "@cdw/monorepo/shared-utils/filters";
import { normalizeAnchor } from "@cdw/monorepo/shared-utils/html/common";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetEventsServerDataDocument } from "../../graphql/default/generated/graphql";

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
            logo: directusImageParams(env.CMS_URL, {
                ...defaultNull(thumbnail),
                alt: "project logo",
                assetParams: { width: 64, quality: 50 },
            }),
            href: `${projectRoute.route}#${normalizeAnchor(project.name)}`,
        })),
        links: e.links.map(({ link }) => link),
        technologies: e.technologies.map(({ technology }) => technology),
        logo: directusImageParams(env.CMS_URL, {
            ...defaultNull(e.logo),
            alt: "event logo",
            assetParams: { width: 128, quality: 30 },
        }),
        startDate: new Date(e.startDate as unknown as string),
        endDate: new Date(e.endDate as unknown as string),
        images: e.images.map(({ file }) =>
            directusImageParams(env.CMS_URL, {
                ...defaultNull(file),
                alt: "event image",
                assetParams: { width: 256, quality: 50 },
            }),
        ),
    }));
}

function createJsonLdThings(
    parentData: LayoutServerData,
    events: ReturnType<typeof transformEvents>,
): Thing[] {
    const { currentLanguage } = parentData;
    return events.map(event => ({
        "@type": "Event",
        name: event.title,
        startDate: event.startDate.toISOString(),
        endDate: event.endDate.toISOString(),
        eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
        description: event.description,
        image: [event.logo.src, ...event.images.map(img => img.src)],
        location: event.location,
        inLanguage: currentLanguage.short,
    }));
}
