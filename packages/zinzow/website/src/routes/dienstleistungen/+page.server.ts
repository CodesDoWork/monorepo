import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { servicePage, services } = await queryDefault({ query: GetServiceDataDocument });

    return {
        ...servicePage,
        services: services.map(service => ({
            ...service,
            thumbnail: directusImageParams({
                ...defaultNull(service.thumbnail),
                alt: service.route.name,
                assetParams: { quality: 50, width: 720 },
            }),
        })),
    };
};
