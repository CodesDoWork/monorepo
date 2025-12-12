import type { PageServerLoad } from "./$types";
import { queryDefault } from "../../graphql/default/client";
import { GetContactDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetContactSystemDataDocument } from "../../graphql/system/generated/graphql";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.contact.";

    const defaultData = await queryDefault({ query: GetContactDataDocument });
    const { translations } = await querySystem({
        query: GetContactSystemDataDocument,
        variables: { pageIdPrefix },
    });

    return { ...defaultData, texts: getTextsFromTranslations(translations, pageIdPrefix) };
};
