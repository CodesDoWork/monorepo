export const configFile = "latex.config.json";

export interface LatexConfig {
    engine?: "pdflatex" | "xelatex" | "lualatex";
    args?: string[];
    srcDir?: string;
    mainFile?: string;
}
