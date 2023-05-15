import { Question } from "inquirer";
import { readdirSync } from "fs";
import { AppConfig } from "../../../config/config.schema";

export type Variant = {
    name: string;
    questions: (options: AppConfig["options"]) => Question[];
};

export const appVariants: Record<string, Variant> = readdirSync(__dirname)
    .filter(file => file.endsWith(".js") && file !== "index.js")
    .map(
        (file): Variant => ({
            name: file.replace(".js", ""),
            // eslint-disable-next-line @typescript-eslint/no-var-requires
            questions: require(`./${file}`).default,
        }),
    )
    .reduce((all, variant) => ({ ...all, [variant.name]: variant }), {});
