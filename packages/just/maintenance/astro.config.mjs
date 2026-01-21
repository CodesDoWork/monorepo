import { fileURLToPath } from "node:url";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

const resolvedOutDir = fileURLToPath(
    new URL("../../../dist/packages/just/maintenance", import.meta.url),
);

export default defineConfig({
    root: fileURLToPath(new URL(".", import.meta.url)),
    srcDir: "./src",
    outDir: resolvedOutDir,
    cacheDir: "../../../node_modules/.vite/packages/just/maintenance",
    vite: {
        build: {
            outDir: resolvedOutDir,
            emptyOutDir: true,
        },
        server: {
            host: "0.0.0.0",
            fs: {
                // eslint-disable-next-line node/prefer-global/process
                allow: [process.cwd(), "../../../node_modules", "../branding/assets"],
            },
        },
        plugins: [nxViteTsPaths(), tailwindcss()],
    },
});
