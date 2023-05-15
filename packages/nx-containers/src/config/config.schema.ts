export type WorkspaceConfig = {
    base: string;
    variant: ImageVariant;
    organization?: string;
    baseExtensions?: string[];
    workspaceExtensions?: string[];
    devExtensions?: string[];
};

type BaseAppConfig = {
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

export enum ImageVariant {
    Alpine = "alpine",
    DebianMinimal = "debian minimal",
}

type DockerConfig = {
    engine: "docker";
    options: {
        base: string;
    };
};

type DockerComposeConfig = {
    engine: "dockerCompose";
    options: {
        composeFile?: string;
    };
};

export type AppConfig = BaseAppConfig & (DockerConfig | DockerComposeConfig);
