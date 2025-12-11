import type { HandleServerError } from "@sveltejs/kit";
import { getErrorData } from "./lib/server/error-data";

interface SvelteKitError {
    status: number;
    text: string;
}

export const handleError: HandleServerError = async ({ error }) => {
    console.error(error);
    const { status, text } = error as SvelteKitError;
    return getErrorData(status, text);
};
