import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { addAssetUrl } from "@cdw/monorepo/shared-utils/directus";
import { defaultClient } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetCareerSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.career.";

    const { data: careerData } = await defaultClient.query({ query: GetCareerDataDocument });
    const { careerBenefits, vacancies } = careerData;
    const { data: tranlationsData } = await systemClient.query({
        query: GetCareerSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations } = tranlationsData;

    return {
        career: {
            ...careerData.career,
            teamPhoto: directusImageParams({
                ...defaultNull(careerData.career.teamPhoto),
                alt: "Team Photo",
                assetParams: { width: 1024, quality: 50 },
            }),
        },
        careerBenefits,
        vacancies: vacancies.map(vacancy => ({
            ...vacancy,
            attachment: addAssetUrl(vacancy.attachment),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
