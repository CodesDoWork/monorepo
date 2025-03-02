import type { PromiseExecutor } from "@nx/devkit";
import { trivyAnalyzeImage } from "@cdw/monorepo/shared-trivy";
import { dockerImage, getBaseDockerVars } from "../utils/docker-base";

const runExecutor: PromiseExecutor = async (_, context) => {
    try {
        const { DOCKER_PROXY } = getBaseDockerVars();
        await trivyAnalyzeImage(dockerImage(context.projectName ?? ""), { DOCKER_PROXY });
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runExecutor;
