import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { OSVariant } from "../../config/config.schema";

addExtension({
    name: "ni",
    description: "Installs ni",
    generators: [
        {
            target: DockerfileKind.Dev,
            imageVariants: [OSVariant.Alpine, OSVariant.DebianMinimal],
            area: DockerfileArea.PreInstall,
            generator: () => "RUN npm i -g @antfu/ni",
        },
    ],
});
