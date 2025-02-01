import { trivyAnalyzeFs } from "@codesdowork/shared-trivy";

trivyAnalyzeFs()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
