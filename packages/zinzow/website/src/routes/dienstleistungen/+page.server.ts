import type { PageServerLoad } from "./$types";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { GetServiceSystemDataDocument } from "../../graphql/system/generated/graphql";
import { addAssetUrl } from "../../utils/graphql/assets";
import { getTextsFromTranslations } from "../../utils/translations";
import { systemClient } from "../../graphql/system/client";
import { defaultClient } from "../../graphql/default/client";

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
