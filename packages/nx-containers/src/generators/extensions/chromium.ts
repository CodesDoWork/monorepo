import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { ImageVariant } from "../../config/config.schema";

addExtension({
    name: "chromium",
    description: "Installs chromium",
    generators: [
        {
            target: DockerfileKind.Base,
            variants: [ImageVariant.Alpine],
            area: DockerfileArea.PreInstall,
            generator: () => "RUN apk add chromium",
        },
        {
            target: DockerfileKind.Base,
            variants: [ImageVariant.DebianMinimal],
            area: DockerfileArea.PreInstall,
            generator: () => [
                "RUN apt-get update",
                "RUN apt-get install -y procps chromium && rm -rf /var/lib/apt/lists/*",
            ],
        },
    ],
});
