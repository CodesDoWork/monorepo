import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { logger } from "@nx/devkit";
import { zProjectSecretsConfig, zRootSecretConfig } from "./generators/env/types";

logger.info("Generating schemas...");

const dir = "generated/schemas";
if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
}

writeFileSync(
    join(dir, "env.config.schema.json"),
    JSON.stringify(zRootSecretConfig.toJSONSchema({ io: "input" }), null, 4),
);
writeFileSync(
    join(dir, "env.schema.json"),
    JSON.stringify(zProjectSecretsConfig.toJSONSchema({ io: "input" }), null, 4),
);
logger.info("Done");
