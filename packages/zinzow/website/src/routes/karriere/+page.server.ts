import type { PageServerLoad } from "./$types";
import { GetCareerData } from "../../graphql/default/generated/gql";
import { GetCareerSystemData } from "../../graphql/system/generated/gql";
import { toPromise } from "../../utils/graphql/apollo";
import { addAssetUrl } from "../../utils/graphql/assets";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.career.";
    const { careerBenefits, vacancies } = await toPromise(GetCareerData({}));
    const { translations } = await toPromise(GetCareerSystemData({ variables: { pageIdPrefix } }));

    return {
        careerBenefits,
        vacancies: vacancies.map(vacancy => ({
            ...vacancy,
            attachment: addAssetUrl(vacancy.attachment),
        })),
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
