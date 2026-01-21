import type { AppType } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
import webExtension from "vite-plugin-web-extension";

export default defineConfig({
    root: import.meta.dirname,
    cacheDir: "../../../../node_modules/.vite/packages/just/music/download-addon",
    plugins: [
        tailwindcss(),
        nxViteTsPaths(),
        webExtension({
            browser: "firefox",
            manifest: "src/manifest.json",
        }),
    ],
    build: {
        outDir: "../../../../dist/packages/just/music/download-addon",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    appType: "custom" as AppType,
});
