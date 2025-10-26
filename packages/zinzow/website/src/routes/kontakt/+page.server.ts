import type { PageServerLoad } from "./$types";
import { GetContactDataDocument } from "../../graphql/default/generated/graphql";
import { GetContactSystemDataDocument } from "../../graphql/system/generated/graphql";
import { getTextsFromTranslations } from "../../utils/translations";
import { defaultClient } from "../../graphql/default/client";
import { systemClient } from "../../graphql/system/client";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.contact.";

    const { data: defaultData } = await defaultClient.query({ query: GetContactDataDocument });
    const { data: translationsData } = await systemClient.query({
        query: GetContactSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations } = translationsData;

    return { ...defaultData, texts: getTextsFromTranslations(translations, pageIdPrefix) };
};
