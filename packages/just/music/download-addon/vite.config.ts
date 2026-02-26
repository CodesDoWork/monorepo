import webExtension from "vite-plugin-web-extension";
/* eslint-disable-next-line nx/enforce-module-boundaries */
import { getViteConfig } from "../../../shared/configs/src/vite-config";

export default getViteConfig({
    dirname: import.meta.dirname,
    svelte: false,
    extraPlugins: [
        webExtension({
            browser: "firefox",
            manifest: "src/manifest.json",
        }),
    ],
});
