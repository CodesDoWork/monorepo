import type { Graph } from "schema-dts";
import type { LayoutServerLoad } from "./$types";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { env } from "../env";
import { queryDefault } from "../graphql/default/client";
import { GetLayoutDataDocument } from "../graphql/default/generated/graphql";
import { querySystem } from "../graphql/system/client";
import { GetLayoutSystemDataDocument } from "../graphql/system/generated/graphql";

export const load: LayoutServerLoad = async () => {
    const systemData = await querySystem({ query: GetLayoutSystemDataDocument });
    const defaultData = await queryDefault({ query: GetLayoutDataDocument });

    const layoutJsonLd = createLayoutJsonLd({
        legalName: systemData.settings.legalName,
        description: systemData.settings.projectDescription,
        socials: defaultData.socialMedias.map(s => s.url),
        logoId: systemData.logo[0]?.id,
        foundingDate: "2002",
        address: {
            streetAddress: defaultData.contact.street,
            addressLocality: defaultData.contact.city,
            addressRegion: defaultData.contact.state,
            postalCode: defaultData.contact.postcode,
            addressCountry: "DE",
        },
        contactPoint: {
            telephone: defaultData.contact.tel,
            email: defaultData.contact.email,
        },
    });

    return {
        ...systemData,
        ...defaultData,
        layoutJsonLd,
    };
};

interface JsonLdData {
    legalName: string;
    description: string;
    socials: string[];
    logoId?: string;
    foundingDate: string;
    address: {
        streetAddress: string;
        addressLocality: string;
        addressRegion: string;
        postalCode: string;
        addressCountry: string;
    };
    contactPoint: {
        telephone: string;
        email: string;
    };
}

function createLayoutJsonLd({
    legalName,
    description,
    socials,
    logoId,
    foundingDate,
    address,
    contactPoint,
}: JsonLdData): Graph {
    return {
        "@context": "https://schema.org",
        "@graph": [
            {
                "@type": "Organization",
                "@id": `${env.URL}/#organization`,
                name: legalName,
                url: env.URL,
                sameAs: socials,
                logo: logoId ? assetUrl(logoId) : undefined,
                image: logoId ? assetUrl(logoId) : undefined,
                foundingDate,
                description,
                address: {
                    "@type": "PostalAddress",
                    "@id": `${env.URL}/#address`,
                    ...address,
                },
                contactPoint: {
                    "@type": "ContactPoint",
                    contactType: "general",
                    ...contactPoint,
                    availableLanguage: "de",
                },
            },
        ],
    };
}
