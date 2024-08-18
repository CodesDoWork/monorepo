import { readFileSync, writeFileSync } from "node:fs";

let content = readFileSync(".env.template").toString();
writeFileSync(`.env`, content);
