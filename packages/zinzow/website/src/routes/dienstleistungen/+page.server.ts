import type { PageServerLoad } from "./$types";
import { GetServiceData } from "../../graphql/default/generated/gql";
import { GetServiceSystemData } from "../../graphql/system/generated/gql";
import { toPromise } from "../../utils/graphql/apollo";
import { addAssetUrl } from "../../utils/graphql/assets";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.services.";
    const { translations } = await toPromise(GetServiceSystemData({ variables: { pageIdPrefix } }));
    const { services } = await toPromise(GetServiceData({}));

    return {
        services: services.map(service => ({
            ...service,
            thumbnail: addAssetUrl(service.thumbnail),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
