import type { Config } from "tailwindcss";
import type { KeyValuePair } from "tailwindcss/types/config";
import tailwindForms from "@tailwindcss/forms";
import colors from "tailwindcss/colors";
import plugin from "tailwindcss/plugin";

const brandBlue = colors.sky;
const brandGreen = colors.teal;
const brandOrange = colors.orange;
const brandRed = colors.red;
const brandPink = colors.fuchsia;
const brandPurple = colors.violet;

const animationDelayPlugin = plugin(({ matchUtilities, theme }) => {
    matchUtilities(
        {
            "animate-delay": value => ({
                animationDelay: value,
            }),
        },
        { values: theme("transitionDelay") },
    );
});

type Keyframes = KeyValuePair<string, KeyValuePair<string, string>>;

const fadeIn = {
    "0%": {
        opacity: "0",
        transform: "translateY(4rem)",
        display: "none",
    },
    "100%": {
        opacity: "1",
        transform: "translateY(0)",
    },
} satisfies Keyframes;

function cloneAnimation<T extends Keyframes>(animation: T): T {
    return Object.entries(animation).reduce(
        (all, [key, value]) => ({ ...all, [key]: { ...value } }),
        {},
    ) as T;
}

const fadeInSubtle = cloneAnimation(fadeIn);
fadeInSubtle["0%"].transform = "translateY(1rem)";
const fadeInTopSubtle = cloneAnimation(fadeInSubtle);
fadeInTopSubtle["0%"].transform = "translateY(-1rem)";

export const tailwindConfig: Config = {
    content: [],
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
            width: {
                a4: "210mm",
            },
            height: {
                a4: "297mm",
            },
            spacing: {
                "a4-page-padding": "18mm",
            },
            boxShadow: {
                a4: "0 0 5mm rgba(0,0,0,0.1)",
            },
            animation: {
                "spin-slow": "spin 3s linear infinite",
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
                        opacity: "0",
                    },
                },
                fadeIn,
                fadeInSubtle,
                fadeInTopSubtle,
                switch: {
                    "0%": {},
                    "50%": {
                        opacity: "0",
                        transform: "translateY(0.5rem)",
                    },
                    "100%": {},
                },
                grow: {
                    "0%": {
                        opacity: "0",
                        transform: "scaleY(0)",
                    },
                    "100%": {
                        opacity: "1",
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
