import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";

const dir = "../../just-site";
let content = readFileSync(".env.template").toString();

if (!existsSync(dir)) {
    mkdirSync(dir);
}
writeFileSync(`${dir}/.env`, content);
