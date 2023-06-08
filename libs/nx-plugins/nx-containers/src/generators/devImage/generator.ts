import { Tree } from "@nrwl/devkit";
import { Dockerfile, getImage, WorkspaceImage } from "../../utils/docker";
import { join } from "path";
import { existsSync } from "fs";
import { generateDevDockerfile } from "../dockerfiles/generateDevDockerfile";
import { getWorkspaceConfig } from "../workspace/getWorkspaceConfig";
import { logStep } from "../../utils/logging";
import { executeCmd } from "../../executors/build/process";
import { buildDockerCommand } from "../../executors/build/buildCommands";

export default async function buildDevImage(tree: Tree) {
    const workspaceConfig = getWorkspaceConfig(tree);
    const root = tree.root;
    const tempFilesDir = join(__dirname.replace(root, ""), "tmp");

    let dockerfile = join(root, Dockerfile.Dev);
    if (!existsSync(dockerfile)) {
        dockerfile = join(tempFilesDir, Dockerfile.Dev);
        await generateDevDockerfile(tree, workspaceConfig, tempFilesDir, true);
    }

    logStep("Building dev image");
    return executeCmd(
        buildDockerCommand(getImage(WorkspaceImage.Dev, workspaceConfig.organization), {
            dockerfile,
        }),
    );
}
