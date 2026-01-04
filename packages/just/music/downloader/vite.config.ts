import type { AppType } from "vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";

export async function sveltekitFix(dirname: string) {
    const cwd = process.cwd();
    process.chdir(dirname);
    const plugin = await sveltekit();
    process.chdir(cwd);
    return plugin;
}

export default defineConfig(() => ({
    root: import.meta.dirname,
    cacheDir: "../../../../node_modules/.vite/packages/just/music/downloader",
    server: {
        port: 4200,
        host: "localhost",
        fs: {
            allow: [process.cwd(), "../../../../node_modules", "../../branding/assets"],
        },
    },
    preview: {
        port: 4300,
        host: "localhost",
    },
    plugins: [nxViteTsPaths(), sveltekitFix(__dirname), tailwindcss()],
    // Uncomment this if you are using workers.
    // worker: {
    //   plugins: () => [ nxViteTsPaths() ],
    // },
    build: {
        outDir: "../../../../dist/packages/just/music/downloader",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
    appType: "custom" as AppType,
}));
