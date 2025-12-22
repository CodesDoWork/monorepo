import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetServiceDataDocument } from "../../graphql/default/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";

export const load: PageServerLoad = async () => {
    const { servicePage, services: serviceData } = await queryDefault({
        query: GetServiceDataDocument,
    });

    const services = serviceData.map(service => ({
        ...service,
        thumbnail: directusImageParams({
            ...defaultNull(service.thumbnail),
            alt: service.route.name,
            assetParams: { quality: 50, width: 720 },
        }),
    }));

    return {
        ...servicePage,
        services,
        jsonldThings: createJsonLdThings(services),
    };
};

interface JsonLdService {
    route?: {
        name: string;
        path: string;
    };
    thumbnail: {
        src: string;
    };
}

function createJsonLdThings(services: JsonLdService[]): Thing[] {
    return services.map(service => ({
        "@type": "Service",
        name: service.route.name,
        provider: {
            "@id": "#organization",
        },
        serviceType: service.route.name,
        url: `${env.URL}${service.route.path}`,
        image: service.thumbnail.src,
    }));
}
