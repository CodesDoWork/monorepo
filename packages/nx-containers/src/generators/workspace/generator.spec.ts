import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { Tree } from "@nrwl/devkit";

import generator from "./generator";
import { WorkspaceGeneratorSchema } from "./schema";

describe("nx-containers generator", () => {
    let appTree: Tree;
    const options: WorkspaceGeneratorSchema = {};

    beforeEach(() => {
        appTree = createTreeWithEmptyWorkspace({ layout: "apps-libs" });
    });

    it("should run successfully", async () => {
        await generator(appTree, options);
        expect(appTree.exists("Dockerfile")).toBe(true);
    });
});
