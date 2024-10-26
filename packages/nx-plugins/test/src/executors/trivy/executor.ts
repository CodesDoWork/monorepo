import { PromiseExecutor } from "@nx/devkit";
import { configDotenv } from "dotenv";
import { trivyAnalyzeImage } from "../../trivy";
import { TrivyExecutorSchema } from "./schema";

const runExecutor: PromiseExecutor<TrivyExecutorSchema> = async (options, context) => {
    try {
        configDotenv();
        await trivyAnalyzeImage(
            `${process.env.IMAGE_BASE}/${options.service || context.projectName}:${process.env.PROJECT_VERSION || "latest"}`,
        );

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
