import { startServer } from "shared/fastify";
import { createAppRouter } from "shared/trpc";
import { download, downloaderRouter, setDownloadDir } from "server/music-downloader/downloader";
import { getTasks, schedulerRouter } from "server/music-downloader/scheduler";
import cron from "node-cron";
import { enrichFastifyEnvs } from "shared/utils";
import { z } from "zod";
import { createEnv } from "@t3-oss/env-core";

enrichFastifyEnvs({ DOWNLOAD_DIR: z.string().optional().default("downloads") })
    .then(envSchema => createEnv({ server: envSchema, runtimeEnv: process.env }))
    .then(env => {
        setDownloadDir(env.DOWNLOAD_DIR);
        startServer({
            port: env.PORT,
            router: createAppRouter(downloaderRouter, schedulerRouter),
            docs: {
                title: "Music Downloader API",
                version: env.VERSION,
                baseUrl: env.BASE_URL,
            },
        });
    });

cron.schedule("*/30 * * * *", () => getTasks().then(tasks => tasks.forEach(download)));
