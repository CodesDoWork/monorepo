import type { RequestHandler } from "@sveltejs/kit";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { error } from "@sveltejs/kit";
import { env } from "../../../../env";
import { getMusicLib } from "../../../../lib/server/headers";

export const GET: RequestHandler = async ({ request, params }) => {
    const { storeFilename } = params;
    if (!storeFilename) {
        return error(405, "storeFilename not provided");
    }

    getMusicLib(request); // for protection
    const filepath = join(env.STORE_DIR, storeFilename);

    try {
        const fileBuffer = readFileSync(filepath);
        return new Response(fileBuffer, {
            headers: {
                "Content-Type": "audio/mpeg",
                "Content-Length": fileBuffer.length.toString(),
            },
        });
    } catch {
        throw error(404, "Audio file not found");
    }
};
