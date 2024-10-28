import adapter from "@sveltejs/adapter-node";
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

/** @type {import("@sveltejs/kit").Config} */
export default {
    kit: {
        adapter: adapter({ out: "../../../dist/packages/zinzow/website" }),
        prerender: {
            handleHttpError: "warn",
        },
    },
    preprocess: vitePreprocess(),
    prerender: {
        crawl: true,
    },
};
