import type { Actions } from "./$types";
import { download } from "../../lib/server/download";
import { getMusicLib } from "../../lib/server/headers";

export const actions = {
    download: async ({ request }) => {
        const userLib = getMusicLib(request);
        const formData = await request.formData();
        download(formData.get("url") as string, userLib);
    },
} satisfies Actions;
