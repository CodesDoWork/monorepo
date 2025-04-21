import type { RequestHandler } from "@sveltejs/kit";
import { setLanguageCookie } from "../../../../shared/language";

export const GET: RequestHandler = async ({ params, cookies }) => {
    const { language } = params;
    setLanguageCookie(cookies, language);

    return new Response(null, { status: 202 });
};
