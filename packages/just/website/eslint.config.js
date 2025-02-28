import baseConfig from "../../../eslint.config.js";

export default [
    ...baseConfig,
    {
        ignores: ["!**/*", "eslint.config.js", "vite.config.ts", ".svelte-kit", "static"],
    },
];
