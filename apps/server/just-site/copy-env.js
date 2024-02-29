import { copyFile } from "copy-file";

copyFile("./apps/server/just-site/.env.template", "./apps/server/just-site/.env").then();
