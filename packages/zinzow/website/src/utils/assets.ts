import { env } from "../env";

export function getAssetUrl(id: string): string {
    return `${env.CMS_URL}/assets/${id}`;
}
