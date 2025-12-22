import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetImpressionsDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { impressions } = await queryDefault({ query: GetImpressionsDataDocument });

    const images = impressions.images
        .map(file => file.directus_files_id)
        .map(f => ({
            ...f,
            ...directusImageParams({ ...defaultNull(f), alt: "impression" }),
            tags: f.tags as string[] | null,
        }));

    return {
        impressions: {
            ...impressions,
            images,
        },
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
