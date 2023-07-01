export type WorkspaceConfig = {
    base: string;
    organization?: string;
    baseExtensions?: Record<DockerfileArea, string[]>;
    workspaceExtensions?: Record<DockerfileArea, string[]>;
    registry?: string;
};

export type AppConfig = {
    type: string;
    tags?: string[];
    extensions?: Record<DockerfileArea, string[]>;
    noLint?: boolean;
    noTest?: boolean;
    composeFile?: string;
    composeServiceName?: string;
    registry?: string;
    options: Record<string, unknown>;
};

export enum DockerfileArea {
    PreInstall = "preInstall",
    PostInstall = "postInstall",
    PreCopy = "preCopy",
    PreChecks = "preChecks",
    End = "end",
}
