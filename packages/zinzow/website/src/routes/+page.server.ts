import type { AssetParams } from "@cdw/monorepo/shared-utils/directus";
import type { PageServerLoad } from "./$types";
import { shuffle } from "@cdw/monorepo/shared-utils/arrays";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../graphql/default/client";
import { GetHomeDataDocument } from "../graphql/default/generated/graphql";
import { querySystem } from "../graphql/system/client";
import { GetHomeSystemDataDocument } from "../graphql/system/generated/graphql";
import { directusImageParams } from "../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { heroFiles } = await querySystem({ query: GetHomeSystemDataDocument });
    const defaultData = await queryDefault({ query: GetHomeDataDocument });

    function toDirectusImage(assetParams: AssetParams) {
        return function (f: (typeof heroFiles)[number]) {
            return directusImageParams({ ...defaultNull(f), alt: "hero", assetParams });
        };
    }

    const shuffledHeros = shuffle(heroFiles);
    const landscapeHeros = shuffledHeros
        .filter(f => f.width > f.height)
        .map(toDirectusImage({ quality: 50, width: 1_280 }));
    const portraitHeros = shuffledHeros
        .filter(f => f.height > f.width)
        .map(toDirectusImage({ quality: 50, width: 720 }));

    return {
        landscapeHeros,
        portraitHeros,
        ...defaultData.startPage,
    };
};
