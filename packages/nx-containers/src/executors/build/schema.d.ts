export interface BuildExecutorSchema {
    image?: string;
    tags?: string[];
    organization?: string;
    dockerCompose?: boolean;
    dockerfile?: string;
}
