import { trivyAnalyzeFs } from "@codesdowork/shared-trivy";
import { getBaseDockerVars } from "nx-plugins-docker";

const { DOCKER_PROXY } = getBaseDockerVars();
trivyAnalyzeFs({ DOCKER_PROXY })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
