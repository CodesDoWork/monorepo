import { analyzeFs } from "@codesdowork/trivy";

analyzeFs()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
