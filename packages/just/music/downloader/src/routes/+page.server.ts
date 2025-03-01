import type { Actions } from "./$types";
import { download } from "../helpers/download";

export const actions = {
    download: async ({ request }) => {
        const formData = await request.formData();
        download(formData.get("url") as string);
    },
} satisfies Actions;
