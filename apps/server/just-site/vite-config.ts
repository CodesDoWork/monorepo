/// <reference types="vitest" />
import { defineConfig } from "vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";

export default defineConfig({
    cacheDir: "../../../node_modules/.vite/apps/server/just-site",

    server: {
        port: 4200,
        host: "localhost",
        fs: {
            allow: [process.cwd()],
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
    //      root: '../../',
    //    }),
    //  ],
    // },

    test: {
        globals: true,
        cache: {
            dir: "../../../node_modules/.vitest",
        },
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
});
