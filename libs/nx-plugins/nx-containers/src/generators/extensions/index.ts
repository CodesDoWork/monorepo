import { readdirSync } from "fs";
import { join } from "path";
import inquirer, { Question } from "inquirer";
import { logWarn } from "../../utils/logging";
import { OSVariant } from "../../config/config.schema";

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

const generatorExtensions: Record<string, Extension<any>> = {};

export const getExtensions = (target: DockerfileKind, variant: OSVariant, appVariant?: string) =>
    Object.values(generatorExtensions).filter(extension =>
        extension.generators.some(
            generator =>
                generator.target === target &&
                generator.imageVariants.includes(variant) &&
                (!appVariant || generator.appVariants?.includes(appVariant)),
        ),
    );

export const addExtension = <O extends ExtensionOptions>(extension: Extension<O>) =>
    (generatorExtensions[extension.name] = extension);

export const processExtensions = async (
    extensionNames: string[] = [],
    target: DockerfileKind,
    imageVariant: OSVariant,
    appVariant?: string,
): Promise<Record<DockerfileArea, string>> => {
    const extensionValues: Map<DockerfileArea, string[]> = new Map();
    for (const name of extensionNames) {
        const extension = generatorExtensions[name];
        const availableGenerators = extension.generators.filter(
            generator =>
                generator.target === target &&
                generator.imageVariants.includes(imageVariant) &&
                (!appVariant || generator.appVariants?.includes(appVariant)),
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
            extensionValues.get(area).push(...newValues);
        }
    }

    return Object.fromEntries(
        Array.from(extensionValues.entries()).map(([key, value]) => [key, value.join("\n")]),
    ) as Record<DockerfileArea, string>;
};

type Extension<O extends ExtensionOptions> = {
    name: string;
    description: string;
    generators: ExtensionGenerator<O>[];
    options?: O;
};

type ExtensionGenerator<O extends ExtensionOptions> = {
    target: DockerfileKind;
    area: DockerfileArea;
    imageVariants: OSVariant[];
    appVariants?: string[];
    generator: (options: ExtensionOptionValues<O>) => string | string[];
};

type ExtensionOptionValues<O extends ExtensionOptions> = {
    [K in keyof O]: "string" extends O[K]["type"]
        ? string
        : "number" extends O[K]["type"]
        ? number
        : boolean;
};

type ExtensionOptions = Record<string, Question>;

// load extensions from files inside this directory
// IMPORTANT: DO NOT put this at the top of this file because otherwise
// required files won't be able to import stuff from above.
readdirSync(__dirname).forEach(file => {
    if (file.endsWith(".js") && file !== "index.js") {
        require(join(__dirname, file));
    }
});
