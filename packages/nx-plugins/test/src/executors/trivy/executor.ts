import { PromiseExecutor } from "@nx/devkit";
import { configDotenv } from "dotenv";
import { trivyAnalyzeImage } from "../../trivy";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        configDotenv();
        await trivyAnalyzeImage(
            `${process.env.IMAGE_BASE}/${context.projectName}:${process.env.PROJECT_VERSION || "latest"}`,
        );

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
