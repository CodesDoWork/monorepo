import { execAsync } from "@codesdowork/shared-utils";
import { SpawnOptionsWithoutStdio } from "node:child_process";
import { searchNextComposeDir } from "./compose-config";

export async function runDockerComposeCommand(
    args: (string | undefined)[],
    root: string,
    options?: SpawnOptionsWithoutStdio,
) {
    await runDockerCommand(["compose", ...args], { cwd: searchNextComposeDir(root), ...options });
}

export async function runDockerCommand(
    args: (string | undefined)[],
    options?: SpawnOptionsWithoutStdio,
) {
    await execAsync("docker", args, options);
}
