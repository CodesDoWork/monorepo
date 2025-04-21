import { env } from "../env";

export function assetUrl(id: string): string {
    return `${env.CMS_URL}/assets/${id}`;
}
