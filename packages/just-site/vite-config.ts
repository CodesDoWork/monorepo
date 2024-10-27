/// <reference types="vitest" />
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

const pathParts = process.cwd().split(/[\\/]/);
pathParts.pop();
pathParts.pop();
const nodeModulesPath = pathParts.join("/") + "/node_modules";

export default defineConfig({
    cacheDir: "../../node_modules/.vite/packages/just-site",
    server: {
        port: 4200,
        host: "0.0.0.0",
        fs: {
            allow: [process.cwd(), nodeModulesPath, "../../libs/branding/assets"],
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

    test: {
        globals: true,
        cache: {
            dir: "../../node_modules/.vitest",
        },
        environment: "jsdom",
        include: ["src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
});
