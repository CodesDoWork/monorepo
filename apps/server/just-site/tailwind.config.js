// eslint-disable-next-line @nx/enforce-module-boundaries
import brandingConfig from "../../../libs/branding/tailwind.config.js";
import plugin from "tailwindcss/plugin";

/** @type {import("tailwindcss").Config} */
export default {
    ...brandingConfig,
    content: ["./src/**/*.{html,js,svelte,ts}"],
    plugins: [
        plugin(function({ addBase, theme }) {
            addBase({
                "h2": {
                    "font-size": theme("fontSize.2xl"),
                    "font-weight": theme("fontWeight.bold"),
                    "margin-bottom": "1.5rem",
                },
                "p": {
                    "textAlign": "justify",
                    "margin-top": "1rem",
                }
            });
        }),
    ],
};
