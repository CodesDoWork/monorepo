import antfu from "@antfu/eslint-config";
import nx from "@nx/eslint-plugin";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginBetterTailwindcss from "eslint-plugin-better-tailwindcss";
import eslintPluginHtml from "eslint-plugin-html";
import eslintPluginPrettierRecommended from "eslint-plugin-prettier/recommended";
import eslintPluginToml from "eslint-plugin-toml";

export default antfu(
    {
        typescript: true,
        svelte: true,
        astro: true,
        jsonc: true,
        yaml: {
            overrides: {
                "style/indent": 2,
                "yaml/indent": 2,
            },
        },
        markdown: {
            overrides: {
                "style/indent": 2,
            },
        },
        stylistic: {
            indent: 4,
            quotes: "double",
            semi: true,
            jsx: true,
            overrides: {
                "style/arrow-parens": ["error", "as-needed"],
                "style/quote-props": ["error", "as-needed"],
                "style/brace-style": ["error", "1tbs"],
                "style/max-len": ["warn", { code: 100, ignoreStrings: true }],
                "style/type-generic-spacing": "off",
                "style/operator-linebreak": "off",
                "style/indent": "off",
                "style/indent-binary-ops": "off",
                "style/quotes": ["error", "double", { avoidEscape: true }],
                "style/jsx-closing-bracket-location": ["error", { location: "after-props" }],
            },
        },
        formatters: {
            astro: true,
            css: true,
            html: true,
            markdown: "prettier",
            graphql: true,
            xml: true,
        },
        ignores: ["**/generated"],
    },
    eslintPluginPrettierRecommended,
    ...eslintPluginAstro.configs.recommended,
    {
        plugins: { "better-tailwindcss": eslintPluginBetterTailwindcss },
        rules: {
            ...eslintPluginBetterTailwindcss.configs["recommended-warn"].rules,
            ...eslintPluginBetterTailwindcss.configs["recommended-error"].rules,
            "better-tailwindcss/enforce-consistent-line-wrapping": [
                "error",
                {
                    printWidth: 100,
                    indent: 4,
                },
            ],
            // TODO: Enable linting when plugin supports multiple entry points for monorepo
            "better-tailwindcss/no-unregistered-classes": "off",
        },
    },
    ...eslintPluginToml.configs["flat/recommended"],
    {
        rules: {
            "antfu/consistent-list-newline": "off",
        },
    },
    {
        files: ["**/*.ts", "**/*.js"],
        rules: {
            "node/prefer-global/process": ["error", "always"],
            "node/prefer-global/buffer": ["error", "always"],
        },
    },
    {
        files: ["**/*.md"],
        processor: "markdown/markdown",
    },
    {
        files: ["**/*.html"],
        plugins: { eslintPluginHtml },
    },
    {
        files: ["**/*.astro"],
        rules: {
            "tailwindcss/no-custom-classname": "off",
            "format/prettier": "off",
            "prettier/prettier": "off",
        },
    },
    {
        files: ["**/*.toml"],
        rules: {
            "prettier/prettier": "off",
        },
    },
    {
        files: ["**/*.svelte"],
        rules: {
            "svelte/no-at-html-tags": "off",
            "svelte/no-unused-svelte-ignore": "off",
            "prettier/prettier": "off",
            "tailwindcss/no-custom-classname": "off",
            "tailwindcss/migration-from-tailwind-2": "off",
        },
    },
    {
        plugins: { nx },
        rules: {
            "nx/enforce-module-boundaries": [
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
                            sourceTag: "just-maintenance",
                            onlyDependOnLibsWithTags: [
                                "shared",
                                "just-maintenance",
                                "just-branding",
                            ],
                        },
                        {
                            sourceTag: "just-music-downloader",
                            onlyDependOnLibsWithTags: [
                                "shared",
                                "just-music-downloader",
                                "just-branding",
                            ],
                        },
                        {
                            sourceTag: "just-website",
                            onlyDependOnLibsWithTags: [
                                "shared",
                                "just-cms",
                                "just-website",
                                "just-branding",
                            ],
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
);
