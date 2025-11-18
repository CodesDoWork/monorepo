import type { PageServerLoad } from "./$types";
import { addAssetUrl } from "@cdw/monorepo/shared-utils/directus";
import { defaultClient } from "../../graphql/default/client";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetServiceSystemDataDocument } from "../../graphql/system/generated/graphql";
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
            thumbnail: addAssetUrl(service.thumbnail),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
