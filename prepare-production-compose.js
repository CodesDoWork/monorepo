import { readFileSync, writeFileSync } from "node:fs";
import { parse, stringify } from "yaml";

const file = "./deploy/opt/monorepo/docker-compose.yml";
const compose = parse(readFileSync(file).toString());
delete compose["x-build-args"];
delete compose.services.base;
delete compose.services.workspace;
Object.entries(compose.services).forEach(([, service]) => delete service.build);

writeFileSync(file, stringify(compose));
