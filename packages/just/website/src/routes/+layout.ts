import type { LayoutLoad } from "./$types";
import { byId } from "@cdw/monorepo/shared-utils/filters";
import { getRoute } from "../lib/common/routes";
import { createBreadcrumbList } from "../lib/common/urls";

export const load: LayoutLoad = ({ url, data }) => {
    const currentRouteId = getRoute(data.allRoutes, url.pathname)?.id;
    const currentRoute = data.routes.find(byId(currentRouteId));

    data.layoutJsonLd["@graph"] = [
        ...data.layoutJsonLd["@graph"],
        createBreadcrumbList(data.baseUrl, currentRoute, data.homeRoute),
    ];

    return {
        ...data,
        currentRoute,
    };
};
