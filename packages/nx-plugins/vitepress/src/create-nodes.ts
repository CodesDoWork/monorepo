import { createNodesForProjects, getExecutors } from "@codesdowork/nx-plugins-utils";
import { readFileSync } from "node:fs";
import path from "node:path";
import { z } from "zod";

const zVitepressRcJson = z.object({
    docs: z.string(),
    assets: z.record(z.array(z.string())).optional(),
});

export const createNodes = createNodesForProjects("**/.vitepressrc.json", ({ root }) => {
    const { docs, assets } = zVitepressRcJson.parse(
        JSON.parse(readFileSync(path.join(root, ".vitepressrc.json")).toString()),
    );
    const docsDir = path.join(root, docs);

    return {
        projects: {
            [root]: {
                targets: getExecutors("nx-plugins-vitepress", "", ["build", "serve", "preview"], {
                    docs: docsDir,
                    assets,
                }),
            },
        },
    };
});
