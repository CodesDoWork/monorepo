import { AnyRouter } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify from "fastify";
import ws from "@fastify/websocket";
import { logger } from "shared/logging";

export type FastifyServerOptions = {
    host?: string;
    port?: string | number;
    fallbackPort?: number;
    basePath?: string;
    router: AnyRouter;
    fasitfyOptions?: Parameters<typeof fastify>[0];
};

export const startServer = ({
    fallbackPort,
    host = process.env.HOST,
    port = process.env.PORT || fallbackPort,
    basePath = "/",
    router,
    fasitfyOptions = {},
}: FastifyServerOptions) => {
    const server = fastify({ logger, ...fasitfyOptions });

    server.register(ws);
    server.register(fastifyTRPCPlugin, {
        prefix: basePath,
        trpcOptions: { router },
        useWSS: true,
    });

    if (!port) {
        throw new Error("Please specify a valid port");
    }

    server.listen({ host: host || "localhost", port: Number(port) }, err => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
};
