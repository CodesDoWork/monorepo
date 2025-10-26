import type { HandleServerError } from "@sveltejs/kit";
import { systemClient } from "./graphql/system/client";
import { GetErrorSystemDataDocument } from "./graphql/system/generated/graphql";
import { getTextsFromTranslations } from "./utils/translations";

interface SvelteKitError {
    status: number;
    text: string;
}

export const handleError: HandleServerError = async ({ error }) => {
    const { status, text } = error as SvelteKitError;
    console.error(error);

    const pageIdPrefix = `page.error.${status}.`;

    const { data } = await systemClient.query({
        query: GetErrorSystemDataDocument,
        variables: { pageIdPrefix },
    });
    const { translations, buttonText } = data;

    return {
        message: text,
        ...getTextsFromTranslations(translations, pageIdPrefix),
        buttonText: buttonText[0]?.value,
    };
};
