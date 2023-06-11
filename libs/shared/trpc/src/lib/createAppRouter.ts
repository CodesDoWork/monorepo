import { AnyRouter } from "@trpc/server";
import { mergeRouters } from "./trpc";
import { healthRouter } from "./procedures/health";

export const createAppRouter = (...routers: AnyRouter[]) => mergeRouters(...routers, healthRouter);
