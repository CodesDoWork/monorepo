import type { HandleServerError } from "@sveltejs/kit";
import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";

export const handleError: HandleServerError = async ({ status, message }) => {
    return {
        message: status >= HttpStatusCode.INTERNAL_SERVER_ERROR ? "Something went wrong" : message,
    };
};
