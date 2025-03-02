import type { PageServerLoad } from "./$types";
import { GetContactData } from "../../graphql/default/generated/gql";
import { GetContactSystemData } from "../../graphql/system/generated/gql";
import { toPromise } from "../../utils/graphql";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.contact.";
    const { translations } = await toPromise(GetContactSystemData({ variables: { pageIdPrefix } }));
    const defaultData = await toPromise(GetContactData({}));

    return { ...defaultData, texts: getTextsFromTranslations(translations, pageIdPrefix) };
};
