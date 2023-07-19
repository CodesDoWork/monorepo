import { startServer } from "shared/fastify";
import { snapshotsRouter } from "server/backup-service/snapshots";
import { createFastifyEnv, executeCmd } from "shared/utils";
import { createAppRouter } from "shared/trpc";

executeCmd(["crond"])
    .then(() => createFastifyEnv())
    .then(env => {
        startServer({
            port: env.PORT,
            router: createAppRouter(snapshotsRouter),
            docs: {
                title: "Music Downloader API",
                version: env.VERSION,
                baseUrl: env.BASE_URL,
            },
        });
    });
