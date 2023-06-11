import { procedure, router } from "../trpc";
import { createHealthcheckResult, HealthStatus } from "shared/health";

export const health = procedure.query(() => createHealthcheckResult(HealthStatus.Up));

export const healthRouter = router({ health });
