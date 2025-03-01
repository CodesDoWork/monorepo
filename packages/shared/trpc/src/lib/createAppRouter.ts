import type { AnyRouter } from "@trpc/server";
import { healthRouter } from "./procedures/health";
import { mergeRouters } from "./trpc";

export function createAppRouter<TRouters extends AnyRouter[]>(...routers: TRouters) {
    return mergeRouters(...routers, healthRouter);
}
