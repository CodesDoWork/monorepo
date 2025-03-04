import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
    srcDir: "./src",
    outDir: "../../../dist/packages/just/maintenance",
    vite: {
        server: {
            host: "0.0.0.0",
            fs: {
                allow: ["../../../node_modules", "../branding/assets"],
            },
        },
        cacheDir: "../../../node_modules/.vite/packages/just/maintenance",
    },
    integrations: [tailwind({ applyBaseStyles: false })],
});
