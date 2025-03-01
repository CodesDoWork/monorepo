import type { PromiseExecutor } from "@nx/devkit";
import { runDockerCommand } from "../utils";
import { dockerImage } from "../utils/docker-base";

const runDockerScoutExecutor: PromiseExecutor = async (_, context) => {
    try {
        await runDockerCommand([
            "scout",
            "recommendations",
            dockerImage(context.projectName ?? ""),
        ]);
        return { success: true };
    } catch (e) {
        return { success: false, error: e };
    }
};

export default runDockerScoutExecutor;
