import { querySystem } from "../../graphql/system/client";
import { GetErrorSystemDataDocument } from "../../graphql/system/generated/graphql";
import { getTextsFromTranslations } from "./translations";

export async function getErrorData(status: number, text: string) {
    const pageIdPrefix = `page.error.${status}.`;

    const { translations, buttonText } = await querySystem({
        query: GetErrorSystemDataDocument,
        variables: { pageIdPrefix },
    });

    return {
        message: text,
        ...getTextsFromTranslations(translations, pageIdPrefix),
        buttonText: buttonText[0]?.value,
    };
}
