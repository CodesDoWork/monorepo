import type { AppType } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export async function sveltekitFix() {
    const cwd = process.cwd();
    process.chdir(__dirname);
    const plugin = await sveltekit();
    process.chdir(cwd);
    return plugin;
}

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: "../../../node_modules/.vite/packages/just/food",
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
    plugins: [nxViteTsPaths(), sveltekitFix(), tailwindcss()],
    // Uncomment this if you are using workers.
    // worker: {
    //   plugins: () => [ nxViteTsPaths() ],
    // },
    build: {
        outDir: "../../../dist/packages/just/food",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    appType: "custom" as AppType,
}));
