import { startServer } from "shared/fastify";
import { snapshotsRouter } from "server/backup-service/snapshots";
import { enrichFastifyEnvs, executeCmd } from "shared/utils";
import { createAppRouter } from "shared/trpc";
import { createEnv } from "@t3-oss/env-core";

executeCmd(["crond"])
    .then(() => enrichFastifyEnvs({}))
    .then(envSchema => createEnv({ server: envSchema, runtimeEnv: process.env }))
    .then(env => {
        startServer({
            port: env.PORT,
            basePath: env.BASE_PATH,
            router: createAppRouter(snapshotsRouter),
            docs: {
                title: "Music Downloader API",
                version: env.VERSION,
                baseUrl: env.BASE_URL,
            },
        });
    });
