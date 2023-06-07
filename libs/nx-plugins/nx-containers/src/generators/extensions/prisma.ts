import { addExtension, DockerfileArea, DockerfileKind } from "./index";
import { OSVariant } from "../../config/config.schema";

addExtension({
    name: "prisma",
    description: "Adds prisma support to your workspace",
    generators: [
        {
            target: DockerfileKind.Workspace,
            imageVariants: [OSVariant.Alpine, OSVariant.DebianMinimal],
            area: DockerfileArea.PreChecks,
            generator: () => "RUN npx prisma generate",
        },
        {
            target: DockerfileKind.App,
            imageVariants: [OSVariant.Alpine, OSVariant.DebianMinimal],
            area: DockerfileArea.PostInstall,
            appVariants: ["node"],
            generator: () => [
                "COPY --from=workspace /app/prisma ./prisma",
                "RUN npx prisma generate",
            ],
        },
    ],
});
