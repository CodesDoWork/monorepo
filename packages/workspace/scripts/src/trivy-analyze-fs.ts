import { trivyAnalyzeFs } from "@codesdowork/nx-plugins-test";

trivyAnalyzeFs()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
