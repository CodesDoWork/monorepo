import tailwind from "@astrojs/tailwind";
import { defineConfig } from "astro/config";

export default defineConfig({
    srcDir: "./src",
    vite: {
        server: {
            host: "0.0.0.0",
            fs: {
                allow: ["../../node_modules", "../../libs/branding/assets"],
            },
        },
        cacheDir: "../../node_modules/.vite/apps/maintenance",
    },
    integrations: [tailwind({ applyBaseStyles: false })],
});
