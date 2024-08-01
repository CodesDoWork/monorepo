import tailwindForms from "@tailwindcss/forms";
import deepcopy from "deepcopy";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const brandBlue = colors.sky;
const brandGreen = colors.teal;
const brandOrange = colors.orange;
const brandRed = colors.red;
const brandPink = colors.fuchsia;
const brandPurple = colors.violet;

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

const fadeIn = {
    "0%": {
        opacity: 0,
        transform: "translateY(4rem)",
        display: "none",
    },
    "100%": {
        opacity: 1,
        transform: "translateY(0)",
        display: "block",
    },
};

const fadeInSubtle = deepcopy(fadeIn);
fadeInSubtle["0%"].transform = "translateY(1rem)";
const fadeInTopSubtle = deepcopy(fadeInSubtle);
fadeInTopSubtle["0%"].transform = "translateY(-1rem)";

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
            },
            fontFamily: {
                sans: "Inter",
                mono: "Jetbrains Mono",
            },
            animation: {
                blink: "blink 1.25s steps(1) infinite",
                fadeIn: "fadeIn 0.5s ease-in-out forwards",
                fadeInSubtle: "fadeInSubtle 0.5s ease-in-out forwards",
                fadeInTopSubtle: "fadeInTopSubtle 0.5s ease-in-out forwards",
                fadeOutTopSubtle: "fadeInTopSubtle 0.5s ease-in-out reverse forwards",
                switch: "switch 0.3s ease-in-out",
                grow: "grow 0.5s ease-in-out forwards",
                shrink: "grow 0.5s ease-in-out reverse forwards",
            },
            keyframes: {
                blink: {
                    "50%": {
                        opacity: 0,
                    },
                },
                fadeIn,
                fadeInSubtle,
                fadeInTopSubtle,
                switch: {
                    "0%": {},
                    "50%": {
                        opacity: 0,
                        transform: "translateY(0.5rem)",
                    },
                    "100%": {},
                },
                grow: {
                    "0%": {
                        opacity: 0,
                        transform: "scaleY(0)",
                    },
                    "100%": {
                        opacity: 1,
                        transform: "scaleY(1)",
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
            },
            padding: {
                18: "4.5rem",
                "1/20": "5%",
                "1/15": "6.67%",
                "1/10": "10%",
            },
        },
    },
    plugins: [animationDelayPlugin, tailwindForms],
};
