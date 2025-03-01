import type { SpawnOptionsWithoutStdio } from "node:child_process";
import { execAsync } from "@cdw/monorepo/shared-utils";

export async function runDockerCommand(
    args: (string | false | undefined)[],
    options?: SpawnOptionsWithoutStdio,
) {
    await execAsync("docker", args, options);
}
