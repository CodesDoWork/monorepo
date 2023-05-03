import { WorkspaceGeneratorSchema } from "../workspace/schema";

export type BaseAppGeneratorSchema = WorkspaceGeneratorSchema & {
    appName: string;
    dockerCompose?: boolean;
};

export type AppGeneratorSchema = BaseAppGeneratorSchema & {
    runnerFile: string;
};
