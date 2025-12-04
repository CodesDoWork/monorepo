import type { AssetParams } from "@cdw/monorepo/shared-utils/directus";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";

export interface DirectusImageFile {
    id: string;
    alt: string;
    title: string | null;
    source: string | null;
    assetParams?: AssetParams;
}

export interface DirectusImageParams {
    src: string;
    alt: string;
    source?: string;
}

export function directusImageParams({
    id,
    assetParams,
    title,
    alt,
    source,
}: DirectusImageFile): DirectusImageParams {
    return {
        src: assetUrl(id, assetParams),
        alt: title ?? alt,
        source,
    };
}
