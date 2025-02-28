import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import nx from "@nx/eslint-plugin";
import stylisticEslintPluginTs from "@stylistic/eslint-plugin-ts";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import jsonParser from "jsonc-eslint-parser";
import path from "node:path";
import { fileURLToPath } from "node:url";
import svelteParser from "svelte-eslint-parser";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
    baseDirectory: __dirname,
    recommendedConfig: js.configs.recommended,
    allConfig: js.configs.all,
});

export default [
    {
        ignores: ["**/*"],
    },
    ...compat.extends("eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"),
    {
        plugins: {
            "@nx": nx,
            "@typescript-eslint": typescriptEslint,
            "@stylistic/ts": stylisticEslintPluginTs,
        },

        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
    },
    {
        files: ["**/*"],
        rules: {
            "@typescript-eslint/no-explicit-any": "warn",
            "@typescript-eslint/no-unused-expressions": "off",
        },
    },
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parser: svelteParser,
            ecmaVersion: "latest",
            sourceType: "module",
            parserOptions: {
                parser: "@typescript-eslint/parser",
                extraFileExtensions: [".svelte"],
                lib: ["esnext", "dom"],
            },
        },
    },
    {
        files: ["**/*.json"],
        languageOptions: { parser: jsonParser },
    },
    {
        files: ["**/*.js"],
        rules: {
            "@typescript-eslint/no-require-imports": "off",
        },
    },
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.jsx"],
        rules: {
            "@nx/enforce-module-boundaries": [
                "error",
                {
                    allow: [],
                    depConstraints: [
                        {
                            sourceTag: "shared",
                            onlyDependOnLibsWithTags: ["shared"],
                        },
                        {
                            sourceTag: "app",
                            onlyDependOnLibsWithTags: ["shared"],
                        },
                        {
                            sourceTag: "nx-plugins",
                            onlyDependOnLibsWithTags: ["shared", "nx-plugins"],
                        },
                        {
                            sourceTag: "just-cms",
                            onlyDependOnLibsWithTags: ["shared", "just-cms"],
                        },
                        {
                            sourceTag: "just-website",
                            onlyDependOnLibsWithTags: ["shared", "just-cms", "just-website"],
                        },
                        {
                            sourceTag: "workspace-scripts",
                            onlyDependOnLibsWithTags: ["shared", "workspace-scripts", "nx-plugins"],
                        },
                    ],
                },
            ],
        },
    },
];
