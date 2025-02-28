import globals from "globals";
import baseConfig from "../../../eslint.config.js";

export default [
    ...baseConfig,
    {
        ignores: ["!**/*", "eslint.config.js", "docs/.vitepress/cache"],
    },
    {
        languageOptions: {
            globals: {
                ...globals.commonjs,
                ...globals.node,
            },
        },
    },
];
