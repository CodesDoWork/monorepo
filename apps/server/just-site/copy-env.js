import { copyFile } from "copy-file";

copyFile(".env.template", ".env").then();
