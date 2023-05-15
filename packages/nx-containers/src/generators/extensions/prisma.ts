import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { ImageVariant } from "../../config/config.schema";

addExtension({
    name: "prisma",
    description: "Adds prisma support to your workspace",
    generators: [
        {
            target: DockerfileKind.Workspace,
            variants: [ImageVariant.Alpine, ImageVariant.DebianMinimal],
            area: DockerfileArea.PreChecks,
            generator: () => "RUN npx prisma generate",
        },
        {
            target: DockerfileKind.App,
            variants: [ImageVariant.Alpine, ImageVariant.DebianMinimal],
            area: DockerfileArea.PostInstall,
            generator: () => [
                "COPY --from=workspace /app/prisma ./prisma",
                "RUN npx prisma generate",
            ],
        },
    ],
});
