import { getBaseDockerVars } from "@cdw/monorepo/nx-plugins-docker";
import { trivyAnalyzeFs } from "@cdw/monorepo/shared-trivy";

const { DOCKER_PROXY } = getBaseDockerVars();
trivyAnalyzeFs({ DOCKER_PROXY })
    .then(() => process.exit(0))
    .catch(() => process.exit(1));
