import type { LayoutServerLoad } from "./$types";
import { queryDefault } from "../graphql/default/client";
import { GetLayoutDataDocument } from "../graphql/default/generated/graphql";
import { querySystem } from "../graphql/system/client";
import { GetLayoutSystemDataDocument } from "../graphql/system/generated/graphql";

export const load: LayoutServerLoad = async () => {
    const systemData = await querySystem({ query: GetLayoutSystemDataDocument });
    const defaultData = await queryDefault({ query: GetLayoutDataDocument });

    return {
        ...systemData,
        ...defaultData,
    };
};
