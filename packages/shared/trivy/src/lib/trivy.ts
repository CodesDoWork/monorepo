import { execAsync } from "@codesdowork/shared-utils";

interface TrivyOptions {
    DOCKER_PROXY: string;
}

export async function trivyAnalyzeImage(image: string, options: TrivyOptions) {
    await runTrivy(
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

export async function trivyAnalyzeFs(options: TrivyOptions) {
    await runTrivy(
        [
            "fs",
            "--scanners vuln,secret,misconfig",
            "--dependency-tree",
            '--skip-files "/workspace/**/*.env"',
            '--skip-dirs "/workspace/.nx"',
            '--skip-dirs "/workspace/dist"',
            '--skip-dirs "/workspace/node_modules"',
        ],
        "/workspace",
        options,
    );
}

async function runTrivy(params: string[], target: string, options: TrivyOptions) {
    const { DOCKER_PROXY } = options;
    const trivyBaseOptions = [
        "run --rm",
        "--pull always",
        "-v //var/run/docker.sock:/var/run/docker.sock:ro",
        "-v /root/.docker/config.json:/root/.docker/config.json:ro",
        "-v .:/workspace:ro",
        `${DOCKER_PROXY}/aquasec/trivy`,
    ];

    const repoOptions = [
        "--db-repository ghcr.io/aquasecurity/trivy-db:2,public.ecr.aws/aquasecurity/trivy-db:2",
        "--java-db-repository ghcr.io/aquasecurity/trivy-java-db:1,public.ecr.aws/aquasecurity/trivy-java-db:1",
    ];

    await execAsync("docker", trivyBaseOptions.concat(params).concat(repoOptions).concat(target));
}
