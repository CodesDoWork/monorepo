import { AnyRouter } from "@trpc/server";
import { healthRouter } from "./procedures/health";
import { mergeRouters } from "./trpc";

export const createAppRouter = <TRouters extends AnyRouter[]>(...routers: TRouters) =>
    mergeRouters(...routers, healthRouter);
