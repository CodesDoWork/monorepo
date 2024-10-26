import { execAsync } from "@codesdowork/utils";
import { severityConfig } from "./severity";

export async function analyzeImage(image: string) {
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

export async function analyzeFs() {
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
    for (const [code, severities] of Object.entries(severityConfig)) {
        const severityOptions = [`--exit-code ${code}`, `--severity ${severities.join(",")}`];
        const repoOptions = [
            "--db-repository ghcr.io/aquasecurity/trivy-db:2,public.ecr.aws/aquasecurity/trivy-db:2",
            "--java-db-repository ghcr.io/aquasecurity/trivy-java-db:1,public.ecr.aws/aquasecurity/trivy-java-db:1",
        ];

        await execAsync(
            "docker",
            trivyBaseOptions
                .concat(options)
                .concat(repoOptions)
                .concat(severityOptions)
                .concat(target),
        );
    }
}

const trivyBaseOptions = [
    "run --rm",
    "--pull always",
    "-v //var/run/docker.sock:/var/run/docker.sock:ro",
    "-v /root/.docker/config.json:/root/.docker/config.json:ro",
    "-v .:/workspace:ro",
    "aquasec/trivy",
];
