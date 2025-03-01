import type { Config } from "tailwindcss";
import { tailwindConfig } from "@cdw/monorepo/just-branding";

export default {
    ...tailwindConfig,
    content: ["./src/**/*.{html,js,svelte,ts}"],
} satisfies Config;
