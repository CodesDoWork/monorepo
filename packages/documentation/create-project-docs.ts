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

async function createProjectDocs({ name, paths }: Project) {
    console.log(`Creating docs for ${name}`);
    const entryPoints = paths.join(" ");
    execSync(
        [
            "typedoc",
            "--plugin typedoc-plugin-markdown",
            `--name ${name}`,
            `--exclude "**/node_modules/**"`,
            `--out ./packages/documentation/docs/projects/${name}/code-docs`,
            `--entryPointStrategy expand ${entryPoints}`,
        ].join(" "),
    );

    for (const path of paths) {
        execSync(
            [
                "copyfiles",
                "-a",
                `-e "${path}/node_modules/**/*.md"`,
                `-e "./packages/documentation/docs/**/*.md"`,
                `"${path}/**/*.md"`,
                `./packages/documentation/docs/projects/${name}`,
            ].join(" "),
        );
    }

    console.log(`Created docs for ${name}`);
}

interface Project {
    name: string;
    paths: string[];
}
