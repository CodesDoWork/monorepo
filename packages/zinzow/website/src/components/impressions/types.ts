import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";

export interface Video {
    id: string;
    title: string;
    description: string;
    location?: string;
    tags?: string[];
    thumbnail: DirectusImageParams;
}
