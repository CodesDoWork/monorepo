import type { PageServerLoad } from "./$types";
import { defaultClient } from "../../graphql/default/client";
import { GetCareerDataDocument } from "../../graphql/default/generated/graphql";
import { systemClient } from "../../graphql/system/client";
import { GetCareerSystemDataDocument } from "../../graphql/system/generated/graphql";
import { addAssetUrl } from "../../utils/graphql/assets";
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
        careerBenefits,
        vacancies: vacancies.map(vacancy => ({
            ...vacancy,
            attachment: addAssetUrl(vacancy.attachment),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
