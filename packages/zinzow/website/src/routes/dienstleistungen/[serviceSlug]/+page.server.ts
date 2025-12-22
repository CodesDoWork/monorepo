import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { error } from "@sveltejs/kit";
import { env } from "../../../env";
import { queryDefault } from "../../../graphql/default/client";
import { GetServiceDetailsDataDocument } from "../../../graphql/default/generated/graphql";
import { directusImageParams } from "../../../lib/common/directus-image";
import { getErrorData } from "../../../lib/server/error-data";
import { formatWYSIWYG, wysiwygToText } from "../../../lib/server/wysiwyg";

export const load: PageServerLoad = async ({ url }) => {
    const servicesData = await queryDefault({
        query: GetServiceDetailsDataDocument,
        variables: { route: url.pathname },
    });
    const { services } = servicesData;

    if (services.length === 0) {
        error(404, await getErrorData(404, "Service not found"));
    }

    const service = services[0];

    return {
        description: formatWYSIWYG(service.description),
        images: service.images.map(img =>
            directusImageParams({
                ...defaultNull(img.file),
                alt: service.route.name,
                assetParams: { quality: 50, width: 512 },
            }),
        ),
        jsonldThings: createJsonLdThings(service),
    };
};

interface JsonLdService {
    route?: {
        name: string;
    };
    description?: string;
}

function createJsonLdThings(service: JsonLdService): Thing[] {
    return [
        {
            "@type": "Service",
            name: service.route.name,
            description: wysiwygToText(service.description),
            provider: {
                "@id": `${env.URL}/#organization`,
            },
            serviceType: service.route.name,
        },
    ];
}
