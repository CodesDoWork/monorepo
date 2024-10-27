import { readFileSync, writeFileSync } from "node:fs";

let content = readFileSync(".env.template").toString();

// api key must have 26 characters (also at build time)
content = content.replace(/(?<=GHOST_API_KEY=)\w+/, "12345678901234567890123456");

writeFileSync(".env", content);
