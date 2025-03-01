import antfu from "@antfu/eslint-config";
import nx from "@nx/eslint-plugin";

export default antfu({
    typescript: true,
    react: true,
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
        },
    },
    ignores: ["**/generated"],
}, {
    files: ["**/*.ts", "**/*.js"],
    rules: {
        "node/prefer-global/process": ["error", "always"],
        "node/prefer-global/buffer": ["error", "always"],
    },
}, {
    files: ["**/*.svelte"],
    rules: {
        "svelte/no-at-html-tags": "off",
    },
}, {
    files: ["**/+layout.ts"],
    rules: {
        "react-hooks/rules-of-hooks": "off",
    },
}, {
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
                        onlyDependOnLibsWithTags: ["shared", "just-maintenance", "just-branding"],
                    },
                    {
                        sourceTag: "just-website",
                        onlyDependOnLibsWithTags: ["shared", "just-cms", "just-website", "just-branding"],
                    },
                    {
                        sourceTag: "workspace-scripts",
                        onlyDependOnLibsWithTags: ["shared", "workspace-scripts", "nx-plugins"],
                    },
                ],
            },
        ],
    },
});
