import { readFileSync } from "fs";
import { execSync } from "node:child_process";

const appDir = "./apps/common/documentation";
const docsDir = `${appDir}/docs`;
const projectDocsDir = `${docsDir}/projects`;

const projects = JSON.parse(readFileSync(`${appDir}/doc-projects.json`).toString());
projects.forEach(({ name, entryPoints, docs }) => {
    console.log(`Creating docs for ${name}`);

    entryPoints.forEach(entryPoint => {
        const tsconfig = entryPoint.tsconfig || "./tsconfig.base.json";
        execSync(
            `typedoc --plugin typedoc-plugin-markdown --name ${name} --exclude **/node_modules/** --tsconfig ${tsconfig} --out ${projectDocsDir}/${name}/${entryPoint.path}/code-docs --entryPointStrategy expand ${entryPoint.path}`,
        );
    });

    const docPaths = entryPoints.map(ep => ep.path).concat(docs);

    docPaths.forEach(path => {
        execSync(
            `copyfiles -a -e "${path}/node_modules/**/*.md" -e "${docsDir}/**/*.md" "${path}/**/*.md" ${projectDocsDir}/${name}`,
        );
    });

    console.log(`Created docs for ${name}`);
});
