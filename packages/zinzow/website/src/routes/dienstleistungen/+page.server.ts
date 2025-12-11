import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { defaultClient } from "../../graphql/default/client";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetServiceSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.services.";

    const { data: tranlationsData } = await systemClient.query({
        query: GetServiceSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations } = tranlationsData;
    const { data: servicesData } = await defaultClient.query({ query: GetServiceDataDocument });
    const { services } = servicesData;

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
