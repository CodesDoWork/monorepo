export interface LighthouseExecutorSchema {
    url: string;
    enabled?: boolean;
    headers?: LighthouseHeaders;
}

export type LighthouseHeaders = Record<string, string> & {
    Authorization?: {
        user?: string;
        password?: string;
        token?: string;
        type: "basic" | "bearer";
    };
};
