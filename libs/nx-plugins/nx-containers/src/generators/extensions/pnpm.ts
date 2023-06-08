import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { OSVariant } from "../../config/config.schema";

addExtension({
    name: "pnpm",
    description: "Installs pnpm",
    generators: [
        {
            target: DockerfileKind.Workspace,
            imageVariants: [OSVariant.Alpine, OSVariant.DebianMinimal],
            area: DockerfileArea.PreInstall,
            generator: () => "RUN npm i -g pnpm",
        },
        {
            target: DockerfileKind.Dev,
            imageVariants: [OSVariant.Alpine, OSVariant.DebianMinimal],
            area: DockerfileArea.PreInstall,
            generator: () => "RUN npm i -g pnpm",
        },
    ],
});
