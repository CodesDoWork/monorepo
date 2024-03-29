import { readFileSync } from "fs";
import { execSync } from "node:child_process";

const projects = JSON.parse(
    readFileSync("./apps/server/documentation/doc-projects.json").toString(),
);
projects.forEach(({ name, paths }) => {
    console.log(`Creating docs for ${name}`);
    const entryPoints = paths.join(" ");
    execSync(
        `typedoc --plugin typedoc-plugin-markdown --name ${name} --exclude **/node_modules/** --tsconfig ./tsconfig.base.json --out ./apps/server/documentation/docs/projects/${name}/code-docs --entryPointStrategy expand ${entryPoints}`,
    );

    paths.forEach(path => {
        execSync(
            `copyfiles -a -e "${path}/node_modules/**/*.md" -e "./apps/server/documentation/docs/**/*.md" "${path}/**/*.md" ./apps/server/documentation/docs/projects/${name}`,
        );
    });

    console.log(`Created docs for ${name}`);
});
