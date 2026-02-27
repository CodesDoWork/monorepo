import type { AppType, UserConfig } from "vite";
import { join, relative, resolve } from "node:path";
import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "vite";
/* eslint-disable-next-line nx/enforce-module-boundaries */
import { findNextHigherDirWith } from "../../utils/src/files";

const workspaceDir = findNextHigherDirWith("nx.json");

interface ViteConfigOptions {
    dirname: string;
    svelte?: boolean;
    fsAllowPaths?: string[];
    extraPlugins?: UserConfig["plugins"];
    config?: Partial<UserConfig>;
}

export function getViteConfig(options: ViteConfigOptions): UserConfig {
    const { dirname, svelte = true, fsAllowPaths = [], extraPlugins = [], config = {} } = options;
    const root = resolve(dirname, workspaceDir);
    const relativeDirname = relative(root, dirname);

    async function sveltekitFix() {
        const cwd = process.cwd();
        process.chdir(dirname);
        const plugin = await import("@sveltejs/kit/vite").then(({ sveltekit }) => sveltekit());
        process.chdir(cwd);
        return plugin;
    }

    const plugins = [nxViteTsPaths(), tailwindcss(), ...extraPlugins];
    if (svelte) {
        plugins.push(sveltekitFix());
    }

    return defineConfig({
        root: dirname,
        cacheDir: join(root, "node_modules", ".vite", relativeDirname),
        server: {
            port: 4200,
            host: "0.0.0.0",
            fs: {
                allow: [process.cwd(), join(root, "node_modules"), ...fsAllowPaths],
            },
        },
        preview: {
            port: 4300,
            host: "0.0.0.0",
        },
        plugins,
        worker: {
            plugins: () => [nxViteTsPaths()],
        },
        build: {
            outDir: join(root, "dist", relativeDirname),
            emptyOutDir: true,
            reportCompressedSize: true,
            commonjsOptions: {
                transformMixedEsModules: true,
            },
        },
        appType: "custom" as AppType,
        ...config,
    });
}
