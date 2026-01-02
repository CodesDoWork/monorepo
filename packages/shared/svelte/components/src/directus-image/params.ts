import type { AssetParams } from "@cdw/monorepo/shared-directus";
import { assetUrl } from "@cdw/monorepo/shared-directus";

export interface DirectusImageFile {
    id: string;
    alt: string;
    title: string | null;
    source?: string | null;
    width?: number;
    height?: number;
    assetParams?: AssetParams;
}

export interface DirectusImageParams extends Omit<
    DirectusImageFile,
    "id" | "title" | "assetParams"
> {
    src: string;
}

export function directusImageParams(
    cmsUrl: string,
    { id, assetParams, title, alt, ...rest }: DirectusImageFile,
): DirectusImageParams {
    return {
        src: assetUrl(cmsUrl, id, assetParams),
        alt: title ?? alt,
        ...rest,
    };
}
