import { startServer } from "shared/fastify";
import { createAppRouter } from "shared/trpc";
import { download, downloaderRouter } from "server/music-downloader/downloader";
import { getTasks, schedulerRouter } from "server/music-downloader/scheduler";
import cron from "node-cron";

startServer({
    host: process.env.HOST,
    port: process.env.PORT || 4534,
    router: createAppRouter(downloaderRouter, schedulerRouter),
});

cron.schedule("*/30 * * * *", () => getTasks().then(tasks => tasks.forEach(download)));
