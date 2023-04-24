import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { Tree } from "@nrwl/devkit";

import generator from "./generator";
import { NxContainersGeneratorSchema } from "./schema";

describe("nx-containers:base", () => {
    let appTree: Tree;
    const options: NxContainersGeneratorSchema = {
        nodeVersion: "20",
        dockerCompose: true,
    };

    beforeEach(() => {
        appTree = createTreeWithEmptyWorkspace({ layout: "apps-libs" });
    });

    it("should run successfully", async () => {
        await generator(appTree, options);
        expect(appTree.exists("base.Dockerfile")).toBe(true);
        expect(appTree.exists("docker-compose.yml")).toBe(true);
    });
});
