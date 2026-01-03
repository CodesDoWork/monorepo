import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";

export function writePackageJSON(projectDir: string) {
    const packageJsonPath = join(projectDir, "package.json");
    const packageJson = JSON.parse(readFileSync(packageJsonPath).toString()) as PackageJson;
    const extensionConfig = packageJson["directus:extension"];
    if (!extensionConfig) {
        throw new Error("No directus extension config found");
    }

    const distDir = isBundle(extensionConfig)
        ? processBundle(extensionConfig)
        : processSingleExtension(extensionConfig);

    const dir = join(projectDir, distDir);
    writeOut(packageJson, dir);
}

function processSingleExtension(extension: DirectusSingleExtensionConfig): string {
    const distDir = dirname(extension.path);
    extension.path = "./index.js";
    return distDir;
}

function processBundle(bundle: DirectusExtensionBundleConfig): string {
    const distDir = dirname(bundle.path.app);
    bundle.path.app = "./app.js";
    bundle.path.api = "./api.js";
    return distDir;
}

function writeOut(packageJson: PackageJson, dir: string) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
    writeFileSync(join(dir, "package.json"), JSON.stringify(packageJson, null, 4));
}

function isBundle(config: DirectusExtensionConfig): config is DirectusExtensionBundleConfig {
    return config.type === "bundle";
}

interface PackageJson extends Record<string, unknown> {
    "directus:extension"?: DirectusExtensionConfig;
}

type DirectusExtensionConfig = DirectusSingleExtensionConfig | DirectusExtensionBundleConfig;

interface DirectusSingleExtensionConfig {
    type: string;
    path: string;
    source: string;
}

interface DirectusExtensionBundleConfig {
    type: "bundle";
    path: {
        app: string;
        api: string;
    };
    entries: {
        type: string;
        name: string;
        source: string;
    }[];
}
