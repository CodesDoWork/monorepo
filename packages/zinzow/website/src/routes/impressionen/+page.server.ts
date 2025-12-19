import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetImpressionsDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { impressions } = await queryDefault({ query: GetImpressionsDataDocument });

    return {
        impressions: {
            ...impressions,
            images: impressions.images
                .map(file => file.directus_files_id)
                .map(f => ({
                    ...f,
                    ...directusImageParams({ ...defaultNull(f), alt: "impression" }),
                    tags: f.tags as string[] | null,
                })),
        },
    };
};
