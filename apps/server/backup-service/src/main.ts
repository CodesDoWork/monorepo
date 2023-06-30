import { startServer } from "shared/fastify";
import { snapshotsRouter } from "server/backup-service/snapshots";
import { executeCmd } from "shared/utils";

executeCmd(["crond"]).then(() =>
    startServer({
        fallbackPort: 5555,
        router: snapshotsRouter,
    }),
);
