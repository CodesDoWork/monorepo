import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { appRouter } from "./router";
import { logger } from "shared/logging";

export const startServer = () => {
    const server = fastify({ logger });

    server.register(ws);
    server.register(fastifyTRPCPlugin, {
        prefix: process.env.BASE_PATH || "/",
        trpcOptions: { router: appRouter },
        useWSS: true,
    });

    server.listen(
        { host: process.env.HOST || "localhost", port: Number(process.env.PORT || "5555") },
        err => {
            if (err) {
                server.log.error(err);
                process.exit(1);
            }
        },
    );
};
