import { execAsync } from "@codesdowork/shared-utils";
import { SpawnOptionsWithoutStdio } from "node:child_process";

export async function runDockerCommand(
    args: (string | undefined)[],
    options?: SpawnOptionsWithoutStdio,
) {
    await execAsync("docker", args, options);
}