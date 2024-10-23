import { analyzeImage } from "@codesdowork/trivy";
import { PromiseExecutor } from "@nx/devkit";
import { configDotenv } from "dotenv";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        configDotenv();
        const project = context.projectName;
        if (!project) {
            return { success: false, error: "Not project specified" };
        }

        await analyzeImage(`${process.env.IMAGE_BASE}/${project}`);

        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
