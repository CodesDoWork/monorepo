import type { BreadcrumbList } from "schema-dts";
import type { Route } from "../routes/types";
import { env } from "../env";

export function domainUrl(route: Route) {
    return `${env.URL}${route.route}`;
}

export function createBreadcrumbList(currentRoute: Route, homeRoute: Route): BreadcrumbList {
    return {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: homeRoute.name,
                item: domainUrl(homeRoute),
            },
            {
                "@type": "ListItem",
                position: 2,
                name: currentRoute.name,
                item: domainUrl(currentRoute),
            },
        ],
    };
}
