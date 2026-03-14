import { HttpStatusCode } from "@cdw/monorepo/shared-utils/http-status-codes";
import { error } from "@sveltejs/kit";

export const UserEmailHeader = "X-User-Email";

export function getUserEmail(request: Request) {
    const userEmail = request.headers.get(UserEmailHeader);
    if (!userEmail) {
        error(HttpStatusCode.FORBIDDEN);
    }

    return userEmail;
}
