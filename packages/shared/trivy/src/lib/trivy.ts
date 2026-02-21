import { existsSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";
import { execAsync } from "@cdw/monorepo/shared-utils/exec";
import { findNextHigherDirWith } from "@cdw/monorepo/shared-utils/files";
import { REPORTS_DIR } from "@cdw/monorepo/workspace-constants";
import { logger } from "@nx/devkit";

const WORKSPACE_MOUNT = "/workspace";
const TRIVY_REPORTS_DIR = join(REPORTS_DIR, "trivy");
const INTERNAL_REPORTS_DIR = join(WORKSPACE_MOUNT, TRIVY_REPORTS_DIR);

interface TrivyOptions {
    DOCKER_PROXY: string;
}

export function trivyAnalyzeImage(image: string, options: TrivyOptions): Promise<void> {
    return runTrivy(
        [
            "image",
            "--scanners vuln,secret,misconfig",
            "--image-config-scanners secret,misconfig",
            "--dependency-tree",
            "--image-src docker",
        ],
        image,
        options,
    );
}

export function trivyAnalyzeFs(options: TrivyOptions): Promise<void> {
    return runTrivy(
        [
            "fs",
            "--scanners vuln,secret,misconfig",
            "--dependency-tree",
            '--skip-files "/workspace/**/*.env"',
            '--skip-dirs "/workspace/**/.ssh"',
            '--skip-dirs "/workspace/.direnv"',
            '--skip-dirs "/workspace/.nx"',
            '--skip-dirs "/workspace/.scannerwork"',
            '--skip-dirs "/workspace/dist"',
            '--skip-dirs "/workspace/node_modules"',
        ],
        "/workspace",
        options,
    );
}

async function runTrivy(params: string[], target: string, options: TrivyOptions): Promise<void> {
    const { DOCKER_PROXY } = options;
    const runKey = `${target}-${new Date().toISOString()}`;
    const jsonReport = join(INTERNAL_REPORTS_DIR, `${runKey}.json`);
    const workspaceDir = findNextHigherDirWith("nx.json");

    const trivyBaseOptions = [
        "run --rm",
        "--pull always",
        "-v //var/run/docker.sock:/var/run/docker.sock:ro",
        `-v ${homedir()}/.docker/config.json:/root/.docker/config.json:ro`,
        `-v ${workspaceDir}/.cache/trivy:/tmp/trivy`,
        `-v ${workspaceDir}:${WORKSPACE_MOUNT}`,
        `${DOCKER_PROXY}/aquasec/trivy`,
        "--cache-dir /tmp/trivy/",
    ];

    const repoOptions = [
        "--db-repository ghcr.io/aquasecurity/trivy-db:2,public.ecr.aws/aquasecurity/trivy-db:2",
        "--java-db-repository ghcr.io/aquasecurity/trivy-java-db:1,public.ecr.aws/aquasecurity/trivy-java-db:1",
        "--format json",
        `--output ${jsonReport}`,
    ];

    const htmlConvertOptions = [
        "convert",
        "--format template",
        "--template @contrib/html.tpl",
        `--output ${INTERNAL_REPORTS_DIR}/${runKey}.html`,
    ];

    const failOptions = ["convert", "--exit-code 1", "--severity CRITICAL"];

    createReportsDir(dirname(join(workspaceDir, TRIVY_REPORTS_DIR, `${runKey}.json`)));
    await execAsync("docker", trivyBaseOptions.concat(params).concat(repoOptions).concat(target));
    await execAsync("docker", trivyBaseOptions.concat(htmlConvertOptions).concat(jsonReport));
    const failed = await execAsync(
        "docker",
        trivyBaseOptions.concat(failOptions).concat(jsonReport),
    )
        .then(() => false)
        .catch(() => true);

    if (failed) {
        const err = "Trivy scan detected too high vulnerabilities";
        logger.error(err);
        return Promise.reject(new Error(err));
    }

    return Promise.resolve();
}

function createReportsDir(dir: string) {
    if (!existsSync(dir)) {
        mkdirSync(dir, { recursive: true });
    }
}
