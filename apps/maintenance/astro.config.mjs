import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";

export default defineConfig({

    srcDir: "./src",
    vite: {
        server: {
            fs: {
                allow: ["../../node_modules", "../../libs/branding/assets"],
            },
        },
        cacheDir: "../../node_modules/.vite/apps/maintenance",
    },
    integrations: [tailwind({ applyBaseStyles: false })],
});
