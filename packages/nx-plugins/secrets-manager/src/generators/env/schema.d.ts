export interface EnvFilesGeneratorSchema {
    stages: string[];
    email: string;
    password: string;
    dirs: string[];
    recursive: boolean;
    "no-recursive": boolean;
}
