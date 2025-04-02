import type { HandleServerError } from "@sveltejs/kit";

export const handleError: HandleServerError = async ({ error, status, message }) => {
    console.error(error);

    return {
        message: status >= 500 ? "Something went wrong" : message,
    };
};
