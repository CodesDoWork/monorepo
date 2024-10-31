import { readFileSync } from "node:fs";
import path from "node:path";
import { createNodesForProjects, getExecutors } from "nx-plugins-utils";
import { z } from "zod";

const zVitepressRcJson = z.object({
    docs: z.string(),
    assets: z.record(z.array(z.string())).optional(),
});

export const createNodes = createNodesForProjects("**/.vitepressrc.json", ({ root }) => {
    const { docs, assets } = zVitepressRcJson.parse(
        JSON.parse(readFileSync(path.join(root, ".vitepressrc.json")).toString()),
    );

    const targets = getExecutors("nx-plugins-vitepress", "", ["build", "serve", "preview"], {
        docs,
        assets,
    });

    targets.build.dependsOn = ["pre-build"];
    targets.serve.dependsOn = ["pre-build"];
    targets.preview.dependsOn = ["build"];

    return { projects: { [root]: { targets } } };
});
