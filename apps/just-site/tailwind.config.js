// eslint-disable-next-line @nx/enforce-module-boundaries
import brandingConfig from "../../libs/branding/tailwind.config.js";

export default {
    ...brandingConfig,
    content: ["./src/**/*.{html,js,svelte,ts}"],
    plugins: [],
};
