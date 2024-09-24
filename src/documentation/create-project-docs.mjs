import { readFileSync } from "fs";
import { execSync } from "node:child_process";

const projects = JSON.parse(readFileSync("./src/documentation/doc-projects.json").toString());
projects.forEach(({ name, paths }) => {
    console.log(`Creating docs for ${name}`);
    const entryPoints = paths.join(" ");
    execSync(
        `typedoc --plugin typedoc-plugin-markdown --name ${name} --exclude **/node_modules/** --tsconfig ./tsconfig.base.json --out ./src/documentation/docs/projects/${name}/code-docs --entryPointStrategy expand ${entryPoints}`,
    );

    paths.forEach(path => {
        execSync(
            `copyfiles -a -e "${path}/node_modules/**/*.md" -e "./src/documentation/docs/**/*.md" "${path}/**/*.md" ./src/documentation/docs/projects/${name}`,
        );
    });

    console.log(`Created docs for ${name}`);
});
