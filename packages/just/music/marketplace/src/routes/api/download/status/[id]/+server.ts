import type { RequestHandler } from "./$types";
import { corsHeaders } from "../../../../../lib/server/cors";
import { getDownloadStatus } from "../../../../../lib/server/download";
import { getMusicLib } from "../../../../../lib/server/headers";

export const OPTIONS: RequestHandler = ({ request }) => {
    const origin = request.headers.get("origin");
    return new Response(null, {
        headers: corsHeaders(origin),
    });
};

export const GET: RequestHandler = async ({ request, params }) => {
    const userLib = getMusicLib(request);
    const origin = request.headers.get("origin");

    const stream = getDownloadStatus(userLib, params.id);
    if (!stream) {
        return new Response(null, {
            status: 404,
            headers: corsHeaders(origin),
        });
    }

    return new Response(stream, {
        headers: {
            "Content-Type": "text/event-stream",
            "Cache-Control": "no-cache",
            Connection: "keep-alive",
            ...corsHeaders(origin),
        },
    });
};
