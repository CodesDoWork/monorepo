import type { LayoutServerLoad } from "./$types";
import { defaultClient } from "../graphql/default/client";
import { GetLayoutDataDocument } from "../graphql/default/generated/graphql";
import { systemClient } from "../graphql/system/client";
import { GetLayoutSystemDataDocument } from "../graphql/system/generated/graphql";

export const load: LayoutServerLoad = async () => {
    const { data: systemData } = await systemClient.query({ query: GetLayoutSystemDataDocument });
    const { data: defaultData } = await defaultClient.query({ query: GetLayoutDataDocument });

    return {
        ...systemData,
        ...defaultData,
    };
};
