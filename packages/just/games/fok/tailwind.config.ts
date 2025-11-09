import type { Config } from "tailwindcss";
import { tailwindConfig } from "@cdw/monorepo/just-branding";

const config: Config = {
    ...tailwindConfig,
    content: ["./src/**/*.{html,js,svelte,ts}"],
};

config.theme.extend.fontFamily = {
    serif: "Crimson Text"
};

export default config;
