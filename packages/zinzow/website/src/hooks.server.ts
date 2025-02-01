import type { HandleServerError } from "@sveltejs/kit";
import { GetErrorSystemData } from "./graphql/system/generated/gql";
import { toPromise } from "./utils/graphql";
import { getTextsFromTranslations } from "./utils/translations";

interface SvelteKitError {
    status: number;
    text: string;
}

export const handleError: HandleServerError = async ({ error }) => {
    const { status, text } = error as SvelteKitError;

    const pageIdPrefix = `page.error.${status}.`;
    const { translations, buttonText } = await toPromise(
        GetErrorSystemData({ variables: { pageIdPrefix } }),
    );

    return {
        message: text,
        ...getTextsFromTranslations(translations, pageIdPrefix),
        buttonText: buttonText[0]?.value,
    };
};
