# nx-plugins-latex

A plugin to provide latex tasks and executors. Expects a `latex.config.json` file in the project
root containing the following options:

```typescript
interface LatexConfig {
    engine?: "pdflatex" | "xelatex" | "lualatex"; // defaults to pdflatex
    args?: string[]; // defaults to []
    srcDir?: string; // defaults to ./src
    mainFile?: string; // defaults to main.tex - is overridden by file in executor
}
```
