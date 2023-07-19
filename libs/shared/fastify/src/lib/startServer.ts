import { AnyRouter } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify, { FastifyHttpOptions } from "fastify";
import { logger } from "shared/logging";
import { Server } from "http";
import { generateOpenApiDocument, GenerateOpenApiDocumentOptions } from "trpc-openapi";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastifySwagger from "@fastify/swagger";

export type FastifyServerOptions = {
    host?: string;
    port: string | number;
    basePath?: string;
    router: AnyRouter;
    docs?: GenerateOpenApiDocumentOptions & {
        routePrefix?: string;
    };
    fasitfyOptions?: FastifyHttpOptions<Server>;
};

const openapiTRPCWarning =
    "Warning: This document was generated from trpc. TRPC uses ?input={{json}} and not the traditional parameters!";

export const startServer = ({
    host = process.env.HOST || "0.0.0.0",
    port,
    basePath = "/",
    router,
    docs,
    fasitfyOptions = {},
}: FastifyServerOptions) => {
    const server = fastify({ logger, ...fasitfyOptions });

    if (docs) {
        docs.description = docs.description
            ? `${docs.description}\n${openapiTRPCWarning}`
            : openapiTRPCWarning;

        server.register(fastifySwagger, {
            mode: "static",
            specification: {
                document: generateOpenApiDocument(router, docs),
            },
        });
        server.register(fastifySwaggerUi, { routePrefix: docs.routePrefix ?? "/api" });
    }

    server.register(fastifyTRPCPlugin, {
        prefix: basePath,
        trpcOptions: { router },
    });

    server.listen({ host: host || "0.0.0.0", port: Number(port) }, err => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
};
