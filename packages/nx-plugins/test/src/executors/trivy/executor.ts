import { dockerImage } from "@codesdowork/nx-plugins-docker";
import { PromiseExecutor } from "@nx/devkit";
import { trivyAnalyzeImage } from "../../trivy";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        await trivyAnalyzeImage(dockerImage(context.projectName ?? ""));
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
