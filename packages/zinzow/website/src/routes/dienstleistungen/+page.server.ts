import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetServiceSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.services.";

    const { translations } = await querySystem({
        query: GetServiceSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { services } = await queryDefault({ query: GetServiceDataDocument });

    return {
        services: services.map(service => ({
            ...service,
            thumbnail: directusImageParams({
                ...defaultNull(service.thumbnail),
                alt: service.route.name,
                assetParams: { quality: 50, width: 720 },
            }),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
