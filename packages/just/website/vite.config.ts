/// <reference types="vitest" />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
    cacheDir: "../../../node_modules/.vite/packages/just/website",
    server: {
        port: 4200,
        host: "0.0.0.0",
        fs: {
            allow: [process.cwd(), "../../../node_modules", "../branding/assets"],
        },
    },

    preview: {
        port: 4300,
        host: "localhost",
    },

    plugins: [sveltekit(), nxViteTsPaths()],

    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [
    //    viteTsConfigPaths({
    //      run_backups: '../../',
    //    }),
    //  ],
    // },
});
