import type { LayoutServerLoad } from "./$types";
import { getUserEmail } from "../lib/server/headers";

export const load: LayoutServerLoad = async ({ request }) => {
    const userEmail = getUserEmail(request);

    return { userEmail };
};
