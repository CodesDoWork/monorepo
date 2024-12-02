import { GetLayloutData } from "../graphql/default/generated/gql";
import { GetSystemLayoutData } from "../graphql/system/generated/gql";
import { toPromise } from "../utils/graphql";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async ({ url }) => {
    const systemData = await toPromise(GetSystemLayoutData({}));
    const defaultData = await toPromise(GetLayloutData({}));

    const currentRoute = defaultData.routes.find(r => r.path === url.pathname);

    return {
        ...systemData,
        ...defaultData,
        currentRoute,
    };
};
