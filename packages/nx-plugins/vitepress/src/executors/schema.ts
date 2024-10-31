export interface VitepressExecutorSchema {
    docs: string;
    assets?: VitepressAssets;
    outDir?: string;
}

export type VitepressAssets = Record<string, string[]>;
