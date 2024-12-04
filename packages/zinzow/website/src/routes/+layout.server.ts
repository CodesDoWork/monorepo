import { GetLayoutData } from "../graphql/default/generated/gql";
import { GetLayoutSystemData } from "../graphql/system/generated/gql";
import { toPromise } from "../utils/graphql";
import type { LayoutServerLoad } from "./$types";

export const load: LayoutServerLoad = async () => {
    const systemData = await toPromise(GetLayoutSystemData({}));
    const defaultData = await toPromise(GetLayoutData({}));

    return {
        ...systemData,
        ...defaultData,
    };
};
