import { publicProcedure } from "../trpc";
import { createHealthcheckResult, HealthStatus } from "shared/health";

export const health = publicProcedure
    .meta({
        openapi: { method: "GET", path: "/health" },
    })
    .query(() => createHealthcheckResult(HealthStatus.Up));
