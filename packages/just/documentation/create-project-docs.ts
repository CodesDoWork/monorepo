import { execSync } from "node:child_process";
import projects from "./doc-projects.json";

async function run() {
    for (const project of projects) {
        await createProjectDocs(project);
    }
}

run()
    .then(() => console.log("Done"))
    .catch(e => {
        console.error(e);
        process.exit(1);
    });

async function createProjectDocs({ name, root, srcPath }: Project) {
    console.log(`Creating docs for ${name}`);
    execSync(
        [
            "typedoc",
            "--plugin typedoc-plugin-markdown",
            `--name ${name}`,
            `--out ./packages/just/documentation/docs/projects/${name}/code-docs`,
            `--entryPointStrategy expand ${srcPath}`,
        ].join(" "),
    );

    execSync(
        [
            "copyfiles",
            "-a",
            `-e "${root}/node_modules/**/*.md"`,
            `-e "./packages/just/documentation/docs/**/*.md"`,
            `"${root}/**/*.md"`,
            `./packages/just/documentation/docs/projects/${name}`,
        ].join(" "),
    );

    console.log(`Created docs for ${name}`);
}

interface Project {
    name: string;
    root: string;
    srcPath: string;
}
