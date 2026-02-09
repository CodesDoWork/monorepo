import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import downloadIcon from "../assets/download.png";
import { env } from "../env";
import { queryDefault } from "../graphql/default/client";
import { GetHomepageDataDocument } from "../graphql/default/generated/graphql";

interface Link {
    icon:
        | string
        | {
              name: string;
              class: string;
          }
        | {
              path: string;
          };
    title: string;
    href: string;
}

const furhterLinks: Link[] = [
    {
        icon: { name: "icon-[tabler--music-cog]", class: "bg-primary" },
        title: "Manage Songs",
        href: "/manage",
    },
    {
        icon: { name: "icon-[pajamas--duplicate]", class: "bg-secondary" },
        title: "Find Duplicates",
        href: "/duplicates",
    },
    {
        icon: { name: "icon-[mdi--tags]", class: "bg-tertiary" },
        title: "Check Metadata",
        href: "/metadata",
    },
    {
        icon: { path: downloadIcon },
        title: "Download Songs",
        href: "/download",
    },
];

export const load: PageServerLoad = async () => {
    const { dashboardItems } = await queryDefault({ query: GetHomepageDataDocument });

    return {
        dashboardItems: dashboardItems
            .map(d => ({
                ...d,
                icon: d.icon
                    ? directusImageParams(env.CMS_URL, {
                          ...defaultNull(d.icon),
                          alt: "icon",
                          assetParams: { quality: 50, width: 720 },
                      })
                    : undefined,
            }))
            .sort((a, b) => a.title.length - b.title.length),
        furhterLinks,
    };
};
