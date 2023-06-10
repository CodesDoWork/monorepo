export type WorkspaceConfig = {
    base: string;
    os: OSVariant;
    organization?: string;
    baseExtensions?: string[];
    workspaceExtensions?: string[];
    registry?: string;
};

export type AppConfig = {
    type: string;
    tags?: string[];
    extensions?: string[];
    composeFile?: string;
    composeServiceName?: string;
    registry?: string;
    options: Record<string, unknown> & {
        copy?: {
            from: string;
            to: string;
        }[];
    };
};

export enum OSVariant {
    Alpine = "alpine",
    DebianMinimal = "debian minimal",
}
