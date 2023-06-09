import { initTRPC } from "@trpc/server";
import { OpenApiMeta } from "trpc-openapi";
import { health } from "./procedures/health";

const t = initTRPC.meta<OpenApiMeta>().create();

export const router = (procedures: Parameters<typeof t.router>[0]) =>
    t.router({ health, ...procedures });
export const mergeRouters = t.mergeRouters;
export const publicProcedure = t.procedure;
