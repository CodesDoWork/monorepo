export interface AppGeneratorSchema {
    appName: string;
    organization?: string;
    dockerCompose?: boolean;
    nodeVersion?: string;
    runnerFile: string;
}
