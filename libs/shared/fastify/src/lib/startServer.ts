import { logger } from "shared/logging";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { AnyRouter } from "@trpc/server";
import { fastifyTRPCPlugin } from "@trpc/server/adapters/fastify";
import fastify, { FastifyHttpOptions, FastifyInstance } from "fastify";
import { Server } from "http";
import { generateOpenApiDocument, GenerateOpenApiDocumentOptions } from "trpc-openapi";

export interface FastifyServerOptions {
    host?: string;
    port: string | number;
    basePath?: string;
    router: AnyRouter;
    docs?: SwaggerOptions;
    fasitfyOptions?: FastifyHttpOptions<Server>;
}

interface SwaggerOptions extends GenerateOpenApiDocumentOptions {
    routePrefix?: string;
}

const openapiTRPCWarning =
    "Warning: This document was generated from trpc. TRPC uses ?input={{json}} and not the traditional parameters!";

export function startServer({
    host = process.env.HOST || "0.0.0.0",
    port,
    basePath = "/",
    router,
    docs,
    fasitfyOptions = {},
}: FastifyServerOptions) {
    const server = fastify({ logger, ...fasitfyOptions });
    setupSwagger(server, router, basePath, docs);

    server.register(fastifyTRPCPlugin, {
        prefix: basePath,
        trpcOptions: { router },
    });

    server.listen({ host, port: Number(port) }, err => {
        if (err) {
            server.log.error(err);
            process.exit(1);
        }
    });
}

function setupSwagger(
    server: FastifyInstance,
    router: AnyRouter,
    basePath: string,
    docs?: SwaggerOptions,
) {
    if (!docs) {
        return;
    }

    docs.description = docs.description
        ? `${docs.description}\n${openapiTRPCWarning}`
        : openapiTRPCWarning;

    server.register(fastifySwagger, {
        prefix: basePath,
        mode: "static",
        specification: {
            document: generateOpenApiDocument(router, docs),
        },
    });
    server.register(fastifySwaggerUi, {
        prefix: basePath,
        routePrefix: docs.routePrefix || "/api",
    });
}
