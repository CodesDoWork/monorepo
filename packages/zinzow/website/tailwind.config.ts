import tailwindForms from "@tailwindcss/forms";
import { Config } from "tailwindcss";

type Colors = Record<string, Record<string | number, string>>;

function generateColors(fullColors: string[], defaultColors: string[]): Colors {
    const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const colors: Colors = {};
    fullColors.forEach(color => {
        colors[color] = { DEFAULT: `var(--${color})` };
        shades.forEach(step => {
            colors[color][step] = `var(--${color}-${step})`;
        });
    });

    defaultColors.forEach(color => {
        colors[color] = { DEFAULT: `var(--${color})` };
    });

    return colors;
}

export const config: Config = {
    content: ["./src/**/*.{html,js,svelte,ts}"],
    theme: {
        extend: {
            colors: generateColors(
                ["primary", "secondary", "accent"],
                ["onPrimary", "onSecondary", "onAccent"],
            ),
            fontFamily: {
                sans: "Lato",
            },
            keyframes: {
                backdrop: {
                    "0%": {
                        "backdrop-filter": "blur(0px) brightness(1)",
                    },
                    "100%": {
                        "backdrop-filter": "blur(4px) brightness(.5)",
                    },
                },
                backdropReverse: {
                    "0%": {
                        "backdrop-filter": "blur(4px) brightness(.5)",
                    },
                    "100%": {
                        "backdrop-filter": "blur(0px) brightness(1)",
                    },
                },
                flyInRight: {
                    "0%": {
                        transform: "translateX(100%)",
                    },
                    "100%": {
                        transform: "translateX(0%)",
                    },
                },
                flyOutRight: {
                    "0%": {
                        transform: "translateX(0%)",
                    },
                    "100%": {
                        transform: "translateX(100%)",
                    },
                },
            },
            animation: {
                backdrop: "backdrop 0.2s ease-in-out forwards",
                backdropReverse: "backdropReverse 0.2s ease-in-out forwards",
                flyInRight: "flyInRight 0.2s ease-in-out forwards",
                flyOutRight: "flyOutRight 0.2s ease-in-out forwards",
            },
        },
    },
    plugins: [tailwindForms],
};

export default config;
