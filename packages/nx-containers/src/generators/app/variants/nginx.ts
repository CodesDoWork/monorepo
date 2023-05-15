import { Question } from "inquirer";
import { AppConfig } from "../../../config/config.schema";

export default function (options: AppConfig["options"]): Question[] {
    return [
        {
            name: "nginxVersion",
            message: "Version of nginx image",
            default: options["nginxVersion"] ?? "1",
            type: "input",
        },
        {
            name: "nginxConf",
            message: "Path to nginx.conf file (enter to skip)",
            default: options["nginxConf"],
            type: "input",
        },
        {
            name: "confFolder",
            message:
                "Path to folder with config files, which will be copied into /etc/nginx/conf.d (enter to skip)",
            default: options["confFolder"],
            type: "input",
        },
        {
            name: "templatesFolder",
            message:
                "Path to folder with templates, which will be copied into /etc/nginx/templates (enter to skip)",
            default: options["templatesFolder"],
            type: "input",
        },
    ];
}
