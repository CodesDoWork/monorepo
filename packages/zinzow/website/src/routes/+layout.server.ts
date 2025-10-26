import type { LayoutServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { defaultClient } from "../graphql/default/client";
import { GetLayoutDataDocument } from "../graphql/default/generated/graphql";
import { systemClient } from "../graphql/system/client";
import { GetLayoutSystemDataDocument } from "../graphql/system/generated/graphql";

export const load: LayoutServerLoad = async ({ url }) => {
    const { data: systemData } = await systemClient.query({ query: GetLayoutSystemDataDocument });
    const { data: defaultData } = await defaultClient.query({ query: GetLayoutDataDocument });

    return {
        ...systemData,
        ...defaultData,
        currentRoute: defaultData.routes.find(r => r.path === url.pathname),
        logo: assetUrl(systemData.logo[0].id),
    };
};
