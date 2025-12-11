import type { AssetParams } from "@cdw/monorepo/shared-utils/directus";
import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { defaultClient } from "../graphql/default/client";
import { GetHomeDataDocument } from "../graphql/default/generated/graphql";
import { systemClient } from "../graphql/system/client";
import { GetHomeSystemDataDocument } from "../graphql/system/generated/graphql";
import { directusImageParams } from "../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { data: systemData } = await systemClient.query({
        query: GetHomeSystemDataDocument,
    });
    const { heroFiles } = systemData;

    const { data: defaultData } = await defaultClient.query({ query: GetHomeDataDocument });

    function toDirectusImage(assetParams: AssetParams) {
        return function (f: (typeof heroFiles)[number]) {
            return directusImageParams({ ...defaultNull(f), alt: "hero", assetParams });
        };
    }

    const landscapeHeros = heroFiles
        .filter(f => f.width > f.height)
        .map(toDirectusImage({ quality: 50, width: 1_280 }));
    const portraitHeros = heroFiles
        .filter(f => f.height > f.width)
        .map(toDirectusImage({ quality: 50, width: 720 }));

    return {
        landscapeHeros,
        portraitHeros,
        ...defaultData.startPage,
    };
};
