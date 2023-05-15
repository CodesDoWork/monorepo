import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { ImageVariant } from "../../config/config.schema";

addExtension({
    name: "ni",
    description: "Installs ni",
    generators: [
        {
            target: DockerfileKind.Dev,
            variants: [ImageVariant.Alpine, ImageVariant.DebianMinimal],
            area: DockerfileArea.PreInstall,
            generator: () => "RUN npm i -g @antfu/ni",
        },
    ],
});
