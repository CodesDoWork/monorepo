import { GetServiceData } from "../../graphql/default/generated/gql";
import { getAssetUrl } from "../../utils/assets";
import { toPromise } from "../../utils/graphql";
import { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const defaultData = await toPromise(GetServiceData({}));
    defaultData.services.forEach(
        service => (service.thumbnail.route = getAssetUrl(service.thumbnail.id)),
    );

    return defaultData;
};
