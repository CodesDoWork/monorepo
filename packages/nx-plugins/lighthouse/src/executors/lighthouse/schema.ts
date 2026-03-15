export interface LighthouseExecutorSchema {
    url: string;
    enabled?: boolean;
    headers?: LighthouseHeaders;
}

export type LighthouseHeaders = Record<string, string> & {
    Authorization?: LighthouseAuthHeader;
};

export type LighthouseAuthHeader = BasicAuthHeader | BearerAuthHeader;

export interface BasicAuthHeader {
    type: "basic";
    user: string;
    password: string;
}

export interface BearerAuthHeader {
    type: "bearer";
    token: string;
}
