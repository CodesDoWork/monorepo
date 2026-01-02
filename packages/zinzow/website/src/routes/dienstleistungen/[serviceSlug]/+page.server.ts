import type { Thing } from "schema-dts";
import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { formatWYSIWYG, wysiwygToText } from "@cdw/monorepo/shared-utils/html/common";
import { error } from "@sveltejs/kit";
import { env } from "../../../env";
import { queryDefault } from "../../../graphql/default/client";
import { GetServiceDetailsDataDocument } from "../../../graphql/default/generated/graphql";
import { stylesMap } from "../../../lib/common/styles";
import { getErrorData } from "../../../lib/server/error-data";

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
        description: formatWYSIWYG(stylesMap, service.description),
        images: service.images.map(img =>
            directusImageParams(env.CMS_URL, {
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
