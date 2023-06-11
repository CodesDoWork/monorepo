import { AnyRouter } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { logger } from "shared/logging";

export type FastifyServerOptions = {
    host?: string;
    port: string | number;
    router: AnyRouter;
    fasitfyOptions?: Parameters<typeof fastify>[0];
};

export const startServer = ({ host, port, router, fasitfyOptions = {} }: FastifyServerOptions) => {
    const server = fastify({ logger, ...fasitfyOptions });

    server.register(ws);
    server.register(fastifyTRPCPlugin, {
        prefix: process.env.BASE_PATH || "/",
        trpcOptions: { router },
        useWSS: true,
    });

    server.listen({ host: host || "localhost", port: Number(port) }, err => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
};
