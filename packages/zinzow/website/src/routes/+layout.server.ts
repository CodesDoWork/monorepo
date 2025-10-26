import type { LayoutServerLoad } from "./$types";
import { GetLayoutDataDocument } from "../graphql/default/generated/graphql";
import { GetLayoutSystemDataDocument } from "../graphql/system/generated/graphql";
import { systemClient } from "../graphql/system/client";
import { defaultClient } from "../graphql/default/client";

export const load: LayoutServerLoad = async () => {
    const { data: systemData } = await systemClient.query({ query: GetLayoutSystemDataDocument });
    const { data: defaultData } = await defaultClient.query({ query: GetLayoutDataDocument });

    return {
        ...systemData,
        ...defaultData,
    };
};
