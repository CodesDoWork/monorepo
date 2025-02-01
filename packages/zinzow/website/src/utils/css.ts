import Color from "color";

export type ColorDict = Record<number | "DEFAULT", string>;
export type CSSVars = Record<string, string | number>;

export function createCssVariables(vars: CSSVars): string {
    return Object.entries(vars)
        .map(([key, value]) => `--${key}: ${value};`)
        .join(" ");
}

export function createColors(colors: Record<string, string>): CSSVars {
    const colorVars: CSSVars = {};
    Object.entries(colors).forEach(([key, value]) => {
        Object.entries(genrateColor(key, value)).forEach(([colorName, colorDict]) => {
            Object.entries(colorDict).forEach(([step, color]) => {
                if (step === "DEFAULT") {
                    colorVars[`${colorName}`] = color;
                } else {
                    colorVars[`${colorName}-${step}`] = color;
                }
            });
        });
    });

    return colorVars;
}

function genrateColor(name: string, value: string): Record<string, ColorDict> {
    const textColorName = `on${name[0].toUpperCase()}${name.substring(1)}`;
    return { [name]: generateShades(value), [textColorName]: { DEFAULT: getContrastText(value) } };
}

function generateShades(baseColor: string): ColorDict {
    const base = Color(baseColor);
    const shadesToCreate = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];
    const colorDict: ColorDict = { DEFAULT: base.hex() };
    shadesToCreate.forEach(step => {
        const whitePercentage = 100 - step / 5;
        const blackPercentage = (step - 500) / 5;
        if (whitePercentage > 0) {
            colorDict[step] = base.mix(Color("white"), whitePercentage / 100).hex();
        } else {
            colorDict[step] = base.mix(Color("black"), blackPercentage / 100).hex();
        }
    });
    return colorDict;
}

function getContrastText(baseColor: string): string {
    const color = Color(baseColor);
    return color.isLight() ? "black" : "white";
}
