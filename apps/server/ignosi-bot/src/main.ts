import { startServer } from "shared/fastify";
import { env } from "./env";
import { createAppRouter } from "shared/trpc";
import { chatRouter } from "./routers/chat";

startServer({
    port: env.PORT,
    basePath: env.BASE_PATH,
    router: createAppRouter(chatRouter),
    docs: {
        title: "Ignosi Bot",
        version: "0.1.0",
        baseUrl: env.BASE_URL,
        routePrefix: "/api",
    },
});
