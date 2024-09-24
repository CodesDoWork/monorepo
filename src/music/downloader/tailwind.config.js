import { createGlobPatternsForDependencies } from "@nx/react/tailwind";
import colors from "tailwindcss/colors";

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        ...createGlobPatternsForDependencies(__dirname),
    ],
    theme: {
        extend: {
            colors: {
                primary: colors.blue,
                onPrimary: colors.white,
                error: colors.red,
            },
        },
    },
    plugins: [require("@tailwindcss/forms")],
};
