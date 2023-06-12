import { startServer } from "shared/fastify";
import { snapshotsRouter } from "server/backup-service/snapshots";

startServer({
    fallbackPort: 5555,
    router: snapshotsRouter,
});
