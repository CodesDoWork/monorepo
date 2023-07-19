import { procedure, router } from "../trpc";
import { createHealthcheckResult, healthcheckResultType, HealthStatus } from "shared/health";
import { z } from "zod";

export const health = procedure
    .meta({ openapi: { method: "GET", path: "/health" } })
    .input(z.object({}))
    .output(healthcheckResultType)
    .query(() => createHealthcheckResult(HealthStatus.Up));

export const healthRouter = router({ health });
