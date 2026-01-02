import type { AssetParams } from "@cdw/monorepo/shared-directus";
import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { shuffle } from "@cdw/monorepo/shared-utils/arrays";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../env";
import { queryDefault } from "../graphql/default/client";
import { GetHomeDataDocument } from "../graphql/default/generated/graphql";
import { querySystem } from "../graphql/system/client";
import { GetHomeSystemDataDocument } from "../graphql/system/generated/graphql";

export const load: PageServerLoad = async () => {
    const { heroFiles } = await querySystem({ query: GetHomeSystemDataDocument });
    const defaultData = await queryDefault({ query: GetHomeDataDocument });

    function toDirectusImage(assetParams: AssetParams) {
        return function (f: (typeof heroFiles)[number]) {
            return directusImageParams(env.CMS_URL, {
                ...defaultNull(f),
                alt: "hero",
                assetParams,
            });
        };
    }

    const shuffledHeros = shuffle(heroFiles);
    const landscapeHeros = shuffledHeros
        .filter(f => f.width > f.height)
        .map(toDirectusImage({ quality: 50, width: 1_280 }));
    const portraitHeros = shuffledHeros
        .filter(f => f.height > f.width)
        .map(toDirectusImage({ quality: 40, width: 720 }));

    return {
        landscapeHeros,
        portraitHeros,
        ...defaultData.startPage,
    };
};
