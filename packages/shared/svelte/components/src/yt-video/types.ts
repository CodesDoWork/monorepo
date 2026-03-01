import type { DirectusImageParams } from "../directus-image";

export interface YTEmbeddedVideo {
    id: string;
    title: string;
    thumbnail: DirectusImageParams;
}
