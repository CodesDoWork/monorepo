import type { BreadcrumbList, Thing } from "schema-dts";
import type { Route } from "../../routes/types";

export function createBreadcrumbList(
    baseUrl: string,
    currentRoute: Route,
    homeRoute: Route,
): BreadcrumbList {
    const currentPage: Thing | null = currentRoute
        ? {
              "@type": "ListItem",
              position: 2,
              name: currentRoute.name,
              item: `${baseUrl}${homeRoute.route}`,
          }
        : null;

    return {
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: homeRoute.name,
                item: `${baseUrl}${homeRoute.route}`,
            },
            ...(currentPage ? [currentPage] : []),
        ],
    };
}
