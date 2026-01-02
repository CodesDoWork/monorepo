import type { RequestHandler } from "@sveltejs/kit";
import { setLanguageCookie } from "../../../../lib/server/language";

export const GET: RequestHandler = async ({ params, cookies }) => {
    const { language } = params;
    setLanguageCookie(cookies, language);

    return new Response(null, { status: 202 });
};
