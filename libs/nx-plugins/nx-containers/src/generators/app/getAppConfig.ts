import { loadAppConfig } from "../../config/config";
import { logError } from "../../utils/logging";
import { Tree } from "@nrwl/devkit";
import { AppConfig } from "../../config/config.schema";
import { exit } from "process";
import { getAppRoot } from "../../utils/tree";

export const getAppConfig = (tree: Tree, appName: string): AppConfig => {
    const appConfig = loadAppConfig(getAppRoot(tree, appName));
    if (!appConfig) {
        logError(
            "No app config found! Please create on using 'nx g @codesdowork/nx-containers:app'",
        );

        exit(1);
    }

    return appConfig;
};
