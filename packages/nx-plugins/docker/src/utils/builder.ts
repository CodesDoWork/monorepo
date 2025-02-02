import { logger } from "@nx/devkit";
import { spawnSync } from "child_process";
import { runDockerCommand } from "./run-command";

const builder = {
    name: "container",
    driver: "docker-container",
    network: {
        name: "container-builder-net",
        ip: "192.168.254.0/24",
    },
};

export async function useBuilder(): Promise<string[]> {
    await createBuilderNetworkIfNotExists();
    await createBuilderIfNotExists();
    return [`--builder=${builder.name}`, "--load", `--network=host`];
}

async function createBuilderNetworkIfNotExists() {
    if (builderNetworkExists()) {
        logger.info(`Builder network '${builder.network.name}' already exsists.`);
        return;
    }

    await createBuilderNetwork();
}

function builderNetworkExists(): boolean {
    return spawnSync("docker", ["network", "inspect", builder.network.name]).status === 0;
}

async function createBuilderNetwork() {
    logger.info(`Creating builder network '${builder.network.name}'`);
    await runDockerCommand([
        "network",
        "create",
        "--driver=bridge",
        `--subnet=${builder.network.ip}`,
        builder.network.name,
    ]);
}

async function createBuilderIfNotExists() {
    if (builderExists()) {
        logger.info(`Builder '${builder.name}' already exsists.`);
        return;
    }

    await createBuilder();
}

function builderExists(): boolean {
    return spawnSync("docker", ["buildx", "inspect", builder.name]).status === 0;
}

async function createBuilder() {
    logger.info(`Creating builder '${builder.name}'`);
    await runDockerCommand([
        "buildx",
        "create",
        `--name ${builder.name}`,
        `--driver=${builder.driver}`,
        "--driver-opt default-load=true",
        `--driver-opt network=${builder.network.name}`,
    ]);
}

export async function removeBuilder() {
    logger.info(`Removing builder '${builder.name}' and network '${builder.network.name}'`);
    await runDockerCommand(["buildx", "rm", builder.name]);
    await runDockerCommand(["network", "rm", builder.network.name]);
}
