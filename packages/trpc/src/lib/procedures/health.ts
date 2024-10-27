import { createHealthcheckResult, healthcheckResultType, HealthStatus } from "@codesdowork/health";
import { z } from "zod";
import { procedure, router } from "../trpc";

export const health = procedure
    .meta({ openapi: { method: "GET", path: "/health" } })
    .input(z.object({}))
    .output(healthcheckResultType)
    .query(() => createHealthcheckResult(HealthStatus.Up));

export const healthRouter = router({ health });
