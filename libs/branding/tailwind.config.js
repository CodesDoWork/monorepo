import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const brandBlue = colors.sky;
const brandGreen = colors.teal;
const brandOrange = colors.orange;
const brandRed = colors.red;
const brandPink = colors.fuchsia;
const brandPurple = colors.violet;
const brandGray = colors.stone;

const animationDelayPlugin = plugin(function ({ matchUtilities, theme }) {
    matchUtilities(
        {
            "animate-delay": value => ({
                animationDelay: value,
            }),
        },
        { values: theme("transitionDelay") },
    );
});

/** @type {import("tailwindcss").Config} */
export default {
    darkMode: "selector",
    theme: {
        extend: {
            colors: {
                onPrimary: colors.white,
                primary: brandBlue,
                brandBlue,
                secondary: brandGreen,
                brandGreen,
                tertiary: brandOrange,
                brandOrange,
                accent: brandPink,
                brandPink,
                brandPurple,
                error: brandRed,
                brandRed,
                neutral: brandGray,
                brandGray,
            },
            fontFamily: {
                heading: ["Jetbrains Mono"],
            },
            animation: {
                blink: "blink 1.25s steps(2) infinite",
                fadeIn: "fadeIn 0.5s ease-in-out forwards",
            },
            keyframes: {
                blink: {
                    "0%": {
                        opacity: 0,
                    },
                },
                fadeIn: {
                    "0%": {
                        opacity: 0,
                        transform: "translateY(4rem)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "translateY(0)",
                    },
                },
            },
            fontSize: {
                0: "0",
            },
            scale: {
                101: "1.01",
            },
            transitionProperty: {
                fontSize: "font-size",
                pColorsShadow: "padding, color, background-color, shadow",
            },
        },
    },
    plugins: [animationDelayPlugin],
};
