import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetImpressionsDataDocument } from "../../graphql/default/generated/graphql";

export const load: PageServerLoad = async () => {
    const { impressions, videos } = await queryDefault({ query: GetImpressionsDataDocument });

    const images = impressions.images
        .map(file => file.directus_files_id)
        .map(f => ({
            ...f,
            ...directusImageParams(env.CMS_URL, {
                ...defaultNull(f),
                alt: "impression",
                assetParams: { height: 512, quality: 67 },
            }),
            tags: f.tags as string[] | null,
        }));

    return {
        impressions: {
            ...impressions,
            images,
        },
        videos,
        jsonldThings: createJsonLdThings(impressions.title, images),
    };
};

interface JsonLdImage {
    src: string;
    description?: string | null;
    tags: string[] | null;
    source?: string;
    title?: string;
}

function createJsonLdThings(name: string, images: JsonLdImage[]): Thing[] {
    return [
        {
            "@type": "ImageGallery",
            name,
            image: images.map(i => ({
                "@type": "ImageObject",
                contentUrl: i.src,
                caption: i.description,
                keywords: i.tags,
                creator: i.source,
                about: i.title,
            })),
        },
    ];
}
