import { globSync } from "glob";

const deployDir = "libs/server/scripts/deploy/";
const filePaths = globSync(`${deployDir}**/*.sh`).map(
    file => "/" + file.replace(/\\/g, "/").substring(deployDir.length),
);

console.log("chmod +x", filePaths.join(" "));
