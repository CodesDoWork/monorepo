import { error } from "@sveltejs/kit";

export const UserEmailHeader = "X-User-Email";

export function getUserEmail(request: Request) {
    const userEmail = request.headers.get(UserEmailHeader);
    if (!userEmail) {
        error(403);
    }

    return userEmail;
}
