import { startServer } from "shared/fastify";
import { createAppRouter } from "shared/trpc";
import { download, downloaderRouter } from "server/music-downloader/downloader";
import { getTasks, schedulerRouter } from "server/music-downloader/scheduler";
import cron from "node-cron";
import { createFastifyEnv } from "shared/utils";

createFastifyEnv().then(env => {
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
