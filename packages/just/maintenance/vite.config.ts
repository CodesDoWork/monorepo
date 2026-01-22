import type { AppType } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export default defineConfig(() => ({
    root: import.meta.dirname,
    base: "./",
    cacheDir: "../../../node_modules/.vite/packages/just/maintenance",
    server: {
        port: 4200,
        host: "0.0.0.0",
        fs: {
            allow: [process.cwd(), "../../../node_modules", "../branding/assets"],
        },
    },
    preview: {
        port: 4300,
        host: "0.0.0.0",
    },
    plugins: [
        nxViteTsPaths(),
        tailwindcss(),
        {
            name: "remove-crossorigin",
            transformIndexHtml(html) {
                return html.replace(/crossorigin/g, "");
            },
        },
    ],
    build: {
        outDir: "../../../dist/packages/just/maintenance",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    appType: "custom" as AppType,
}));
