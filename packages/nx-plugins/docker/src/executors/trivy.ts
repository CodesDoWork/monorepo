import { trivyAnalyzeImage } from "@codesdowork/shared-trivy";
import { PromiseExecutor } from "@nx/devkit";
import { dockerImage } from "../utils/docker-base";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        await trivyAnalyzeImage(dockerImage(context.projectName ?? ""));
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
