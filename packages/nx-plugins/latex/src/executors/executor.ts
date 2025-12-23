import type { PromiseExecutor } from "@nx/devkit";
import type { LatexConfig } from "../config";
import type { LatexExecutorSchema } from "./schema";
import { existsSync, mkdirSync, readFileSync } from "node:fs";
import { join, relative } from "node:path";
import { projectRoot } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";
import { logger } from "@nx/devkit";
import { configFile } from "../config";

export const runLatexExecutor: PromiseExecutor<LatexExecutorSchema> = async (
    { file, args: executorArgs },
    context,
) => {
    try {
        const projectDir = projectRoot(context);
        const config: LatexConfig = JSON.parse(
            readFileSync(join(projectDir, configFile)).toString(),
        );

        const { engine = "pdflatex", args = [], srcDir = "src", mainFile = "main.tex" } = config;
        const cwd = join(projectDir, srcDir);
        const outDir = join("dist", projectDir);
        const relativeOutDir = join(relative(cwd, process.cwd()), outDir);

        if (!existsSync(outDir)) {
            mkdirSync(outDir, { recursive: true });
        }

        await execAsync(
            "latexmk",
            [
                `-${engine}`,
                ...args,
                ...executorArgs,
                "-synctex=1",
                "-interaction=nonstopmode",
                "-file-line-error",
                "-halt-on-error",
                `-output-directory=${relativeOutDir}`,
                file || mainFile,
            ],
            {
                cwd,
                shell: true,
            },
        );

        return { success: true };
    } catch (e) {
        logger.error(e);
        return { success: false };
    }
};

export default runLatexExecutor;
