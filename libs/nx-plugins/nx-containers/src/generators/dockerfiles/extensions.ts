import { DockerfileArea } from "../../config/config.schema";

export const processExtensions = (extensions?: Record<DockerfileArea, string[]>) =>
    Object.entries(extensions || {}).reduce(
        (all, [key, value]) => ({ ...all, [key]: value.join("\n") }),
        {} as Record<DockerfileArea, string>,
    );
