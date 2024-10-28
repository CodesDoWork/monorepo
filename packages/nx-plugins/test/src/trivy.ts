import { execAsync } from "@codesdowork/shared-utils";

export async function trivyAnalyzeImage(image: string) {
    await runTrivy(
        [
            "image",
            "--scanners vuln,secret,misconfig",
            "--image-config-scanners secret,misconfig",
            "--dependency-tree",
            "--image-src docker",
        ],
        image,
    );
}

export async function trivyAnalyzeFs() {
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
    );
}

async function runTrivy(options: string[], target: string) {
    const repoOptions = [
        "--db-repository ghcr.io/aquasecurity/trivy-db:2,public.ecr.aws/aquasecurity/trivy-db:2",
        "--java-db-repository ghcr.io/aquasecurity/trivy-java-db:1,public.ecr.aws/aquasecurity/trivy-java-db:1",
    ];

    await execAsync("docker", trivyBaseOptions.concat(options).concat(repoOptions).concat(target));
}

const trivyBaseOptions = [
    "run --rm",
    "--pull always",
    "-v //var/run/docker.sock:/var/run/docker.sock:ro",
    "-v /root/.docker/config.json:/root/.docker/config.json:ro",
    "-v .:/workspace:ro",
    "aquasec/trivy",
];
