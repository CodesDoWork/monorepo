import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

let content = readFileSync(".env.template").toString();

mkdirSync("../../just-site");
writeFileSync("../../just-site/.env", content);
