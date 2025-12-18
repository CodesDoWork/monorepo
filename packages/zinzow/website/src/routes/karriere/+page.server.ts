import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { career, careerBenefits } = await queryDefault({
        query: GetCareerDataDocument,
    });

    return {
        career: {
            ...career,
            teamPhoto: directusImageParams({
                ...defaultNull(career.teamPhoto),
                alt: "Team Photo",
                assetParams: { width: 1024, quality: 50 },
            }),
        },
        careerBenefits,
    };
};
