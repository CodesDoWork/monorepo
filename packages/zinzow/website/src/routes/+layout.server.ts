import { GetLayloutData } from "../graphql/default/generated/gql";
import { GetSystemLayoutData } from "../graphql/system/generated/gql";
import { toPromise } from "../utils/graphql";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const systemData = await toPromise(GetSystemLayoutData({}));
    const defaultData = await toPromise(GetLayloutData({}));

    return {
        ...systemData,
        ...defaultData,
    };
};
