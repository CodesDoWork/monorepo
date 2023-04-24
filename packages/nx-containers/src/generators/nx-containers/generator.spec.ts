import { createTreeWithEmptyWorkspace } from "@nrwl/devkit/testing";
import { readProjectConfiguration, Tree } from "@nrwl/devkit";

import generator from "./generator";
import { NxContainersGeneratorSchema } from "./schema";

describe("nx-containers generator", () => {
    let appTree: Tree;
    const options: NxContainersGeneratorSchema = { name: "test" };

    beforeEach(() => {
        appTree = createTreeWithEmptyWorkspace({ layout: "apps-libs" });
    });

    it("should run successfully", async () => {
        await generator(appTree, options);
        const config = readProjectConfiguration(appTree, "test");
        expect(config).toBeDefined();
    });
});
