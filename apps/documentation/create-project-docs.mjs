import { readFileSync } from "fs";
import { execSync } from "node:child_process";

const projects = JSON.parse(readFileSync("./apps/documentation/doc-projects.json").toString());
projects.forEach(({ name, entryPoints, docs }) => {
    console.log(`Creating docs for ${name}`);

    entryPoints.forEach(entryPoint => {
        const tsconfig = entryPoint.tsconfig || "./tsconfig.base.json";
        execSync(
            `typedoc --plugin typedoc-plugin-markdown --name ${name} --exclude **/node_modules/** --tsconfig ${tsconfig} --out ./apps/documentation/docs/projects/${name}/${entryPoint.path}/code-docs --entryPointStrategy expand ${entryPoint.path}`,
        );
    });

    const docPaths = entryPoints.map(ep => ep.path).concat(docs);

    docPaths.forEach(path => {
        execSync(
            `copyfiles -a -e "${path}/node_modules/**/*.md" -e "./apps/documentation/docs/**/*.md" "${path}/**/*.md" ./apps/documentation/docs/projects/${name}`,
        );
    });

    console.log(`Created docs for ${name}`);
});
