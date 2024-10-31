export interface VitepressExecutorSchema {
    docs: string;
    assets?: Record<string, string[]>;
    outDir?: string;
}
