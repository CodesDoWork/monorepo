import type { RequestHandler } from "./$types";
import { writeFileSync } from "node:fs";
import { json } from "@sveltejs/kit";
import { v4 as uuidV4 } from "uuid";
import { corsHeaders } from "../../../lib/server/cors";
import { download } from "../../../lib/server/download";
import { getMusicLib } from "../../../lib/server/headers";

export const OPTIONS: RequestHandler = ({ request }) => {
    const origin = request.headers.get("origin");
    return new Response(null, {
        headers: corsHeaders(origin),
    });
};

export const POST: RequestHandler = async ({ request }) => {
    const userLib = getMusicLib(request);
    const origin = request.headers.get("origin");

    try {
        const { url, cookies } = await request.json();
        const cookiePath = `/tmp/youtube_cookies_${uuidV4()}.txt`;
        writeFileSync(cookiePath, cookies);
        const downloadId = download(url, userLib, cookiePath);

        return json(
            { downloadId },
            {
                headers: corsHeaders(origin),
            },
        );
    } catch {
        return json(
            { error: "Invalid request" },
            {
                status: 400,
                headers: corsHeaders(origin),
            },
        );
    }
};
