import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { logger } from "@nx/devkit";
import { zMigrationsConfig } from "./executors/deploy/types";

logger.info("Generating schemas...");

const dir = "generated/schemas";
if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
}

writeFileSync(
    join(dir, "ci.migrations.schema.json"),
    JSON.stringify(zMigrationsConfig.toJSONSchema({ io: "input" }), null, 4),
);
logger.info("Done");
