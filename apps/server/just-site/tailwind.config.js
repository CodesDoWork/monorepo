// eslint-disable-next-line @nx/enforce-module-boundaries
import brandingConfig from "../../../libs/branding/tailwind.config.js";

/** @type {import("tailwindcss").Config} */
export default {
    ...brandingConfig,
    content: ["./src/**/*.{html,js,svelte,ts}"],
    plugins: [],
};
