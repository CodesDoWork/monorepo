import { trivyAnalyzeFs } from "packages/nx-plugins/lighthouse";

trivyAnalyzeFs()
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
