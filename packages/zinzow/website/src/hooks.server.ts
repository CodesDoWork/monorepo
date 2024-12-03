import type { HandleServerError } from "@sveltejs/kit";
import { GetTranslations } from "./graphql/system/generated/gql";
import { toPromise } from "./utils/graphql";
import { getErrorKey, getTranslationKey } from "./utils/translations";

interface SvelteKitError {
    status: number;
    text: string;
}

export const handleError: HandleServerError = async ({ error }) => {
    console.log(error);
    const { status, text } = error as SvelteKitError;

    const { translations } = await toPromise(
        GetTranslations({
            variables: {
                keys: [
                    getErrorKey(status, "title"),
                    getErrorKey(status, "message"),
                    getTranslationKey("button", "backHome"),
                ],
                language: "de-DE",
            },
        }),
    );

    return { ...Object.fromEntries(translations.map(t => [t.key, t.value])), message: text };
};
