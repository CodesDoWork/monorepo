export type WorkspaceConfig = {
    base: string;
    os: OSVariant;
    organization?: string;
    baseExtensions?: string[];
    workspaceExtensions?: string[];
    devExtensions?: string[];
    composeFile?: string;
    registry?: string;
};

export type AppConfig = {
    type: string;
    tags?: string[];
    extensions?: string[];
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
