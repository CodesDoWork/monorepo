import { logger } from "@cdw/monorepo/shared-logging";

function printHelloWorld() {
    const hello = 1;
    const world = 2;
    logger.info({ hello, world }, "Hello World");
}

printHelloWorld();
