import type { AppType } from "vite";

/* eslint-disable-next-line nx/enforce-module-boundaries */
import { getViteConfig } from "../../shared/configs/src/vite-config";

export default getViteConfig({
    dirname: import.meta.dirname,
    svelte: false,
    fsAllowPaths: ["../branding/assets"],
    extraPlugins: [
        {
            name: "remove-crossorigin",
            transformIndexHtml(html) {
                return html.replace(/crossorigin/g, "");
            },
        },
    ],
    config: {
        appType: "spa" as AppType,
    },
});
