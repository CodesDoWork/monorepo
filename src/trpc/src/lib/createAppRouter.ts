import { AnyRouter } from "@trpc/server";
import { mergeRouters } from "./trpc";
import { healthRouter } from "./procedures/health";

export const createAppRouter = <TRouters extends AnyRouter[]>(...routers: TRouters) =>
    mergeRouters(...routers, healthRouter);
