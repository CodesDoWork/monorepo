import { defaultComposeFile } from "../../utils/docker-compose";
import { Dockerfile } from "../../utils/docker";

/**
 * Builds the image build command for docker engine.
 * @param image The image name to use
 * @param args Build arguments
 * @param tags Image tags
 * @param dockerfile Dockerfile to use
 */
export const buildDockerCommand = (
    image: string,
    { args = {}, tags = [], dockerfile = Dockerfile.Normal }: DockerOptions = {},
): string =>
    buildCommand(
        "docker build",
        buildBuildArgsArgument(args),
        buildTagsArgument(image, tags),
        `-f ${dockerfile}`,
        ".",
    );

/**
 * Build the image build command for docker compose engine
 * @param service The docker compose services to use
 * @param args Build arguments
 * @param configFile docker compose file to use
 */
export const buildDockerComposeCommand = (
    service: string,
    { args = {}, configFile = defaultComposeFile }: DockerComposeOptions = {},
): string =>
    buildCommand(
        "docker compose",
        `-f ${configFile}`,
        "build",
        buildBuildArgsArgument(args),
        service,
    );

const buildCommand = (...parts: string[]): string => parts.filter(Boolean).join(" ");

const buildBuildArgsArgument = (args: BuildArgs): string =>
    Object.entries(args)
        .map(([key, value]) => `--build-arg ${key}=${value}`)
        .join(" ");

const buildTagsArgument = (image: string, tags: string[]): string =>
    tags.map(tag => `-t ${image}:${tag}`).join(" ") || `-t ${image}`;

type DockerOptions = {
    args?: BuildArgs;
    tags?: string[];
    dockerfile?: string;
};

type DockerComposeOptions = {
    args?: BuildArgs;
    configFile?: string;
};

type BuildArgs = Record<string, string | number | boolean>;
