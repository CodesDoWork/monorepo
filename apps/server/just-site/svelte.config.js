import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import('@sveltejs/kit').Config} */
export default {
    kit: {
        adapter: adapter(),
    },
    preprocess: vitePreprocess(),
    prerender: {
        handleMissingId: "ignore",
        crawl: true,
    },
};