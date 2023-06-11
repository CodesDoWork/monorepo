import { startServer } from "shared/fastify";
import { snapshotsRouter } from "server/backup-service/snapshots";

startServer({
    host: process.env.HOST,
    port: process.env.PORT || 5555,
    router: snapshotsRouter,
});
