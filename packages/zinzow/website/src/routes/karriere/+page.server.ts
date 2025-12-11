import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { addAssetUrl } from "@cdw/monorepo/shared-utils/directus";
import { queryDefault } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetCareerSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.career.";

    const { career, careerBenefits, vacancies } = await queryDefault({
        query: GetCareerDataDocument,
    });
    const { translations } = await querySystem({
        query: GetCareerSystemDataDocument,
        variables: { pageIdPrefix },
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
        vacancies: vacancies.map(vacancy => ({
            ...vacancy,
            attachment: addAssetUrl(vacancy.attachment),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
