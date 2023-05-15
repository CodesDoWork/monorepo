import { readdirSync } from "fs";
import { join } from "path";
import inquirer, { Question } from "inquirer";
import { logWarn } from "../../utils/logging";
import { ImageVariant } from "../../config/config.schema";

export enum DockerfileArea {
    PreInstall = "preInstall",
    PostInstall = "postInstall",
    PreCopy = "preCopy",
    PreChecks = "preChecks",
    End = "end",
}

export enum DockerfileKind {
    Base = "base",
    Workspace = "workspace",
    App = "app",
    Dev = "dev",
}

export type ExtensionGenerator<O extends ExtensionOptions> = {
    target: DockerfileKind;
    area: DockerfileArea;
    variants: ImageVariant[];
    generator: (options: ExtensionOptionValues<O>) => string | string[];
};

export type ExtensionOptionValues<O extends ExtensionOptions> = {
    [K in keyof O]: "string" extends O[K]["type"]
        ? string
        : "number" extends O[K]["type"]
        ? number
        : boolean;
};

export type ExtensionOptions = Record<string, Question>;

export type Extension<O extends ExtensionOptions> = {
    name: string;
    description: string;
    generators: ExtensionGenerator<O>[];
    options?: O;
};

export const generatorExtensions: Record<string, Extension<any>> = {};

export const getExtensions = (target: DockerfileKind, variant: ImageVariant) =>
    Object.values(generatorExtensions).filter(extension =>
        extension.generators.some(
            generator => generator.target === target && generator.variants.includes(variant),
        ),
    );

export const addExtension = <O extends ExtensionOptions>(extension: Extension<O>) =>
    (generatorExtensions[extension.name] = extension);

export const processExtensions = async (
    extensionNames: string[] = [],
    target: DockerfileKind,
    variant: ImageVariant,
): Promise<Record<DockerfileArea, string>> => {
    const extensionValues: Map<DockerfileArea, string[]> = new Map();
    for (const name of extensionNames) {
        const extension = generatorExtensions[name];
        const availableGenerators = extension.generators.filter(
            generator => generator.target === target && generator.variants.includes(variant),
        );

        if (!availableGenerators.length) {
            logWarn(`Generator '${name}' is not available for target '${target}'`);
        }

        for (const { area, generator } of availableGenerators) {
            const options = await inquirer.prompt(Object.values(extension.options ?? []));
            const generatorResult = generator(options);

            if (!extensionValues.has(area)) {
                extensionValues.set(area, []);
            }

            const newValues = Array.isArray(generatorResult) ? generatorResult : [generatorResult];
            extensionValues.set(area, [...extensionValues.get(area), ...newValues]);
        }
    }

    return Object.fromEntries(
        Array.from(extensionValues.entries()).map(([key, value]) => [key, value.join("\n")]),
    ) as Record<DockerfileArea, string>;
};

readdirSync(__dirname).forEach(file => {
    if (file.endsWith(".js") && file !== "index.js") {
        require(join(__dirname, file));
    }
});
