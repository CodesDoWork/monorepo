import type { OpenApiMeta } from "trpc-openapi";
import { initTRPC } from "@trpc/server";

const t = initTRPC.meta<OpenApiMeta>().create();

export const router = t.router;
export const mergeRouters = t.mergeRouters;
export const procedure = t.procedure;
