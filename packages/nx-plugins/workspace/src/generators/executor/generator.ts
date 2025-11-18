import type { Tree } from "@nx/devkit";
import type { ExecutorGeneratorSchema } from "./schema";
import { getJitiAliasContent } from "@cdw/monorepo/nx-plugins-utils";
import { execAsync } from "@cdw/monorepo/shared-utils";

export async function executorGenerator(tree: Tree, options: ExecutorGeneratorSchema) {
    const [command, ...args] = options.command.split(" ");
    if (!command) {
        throw new Error("No command provided.");
    }

    await execAsync(command, args, {
        cwd: tree.root,
        shell: true,
        env: {
            ...process.env,
            JITI_ALIAS: getJitiAliasContent(tree.root),
        },
    });
}

export default executorGenerator;
