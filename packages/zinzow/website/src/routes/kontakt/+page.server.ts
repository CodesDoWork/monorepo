import type { PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { queryDefault } from "../../graphql/default/client";
import { GetContactDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetContactSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { getTextsFromTranslations } from "../../utils/translations";

export const load: PageServerLoad = async () => {
    const pageIdPrefix = "page.contact.";

    const { contact } = await queryDefault({ query: GetContactDataDocument });
    const { translations } = await querySystem({
        query: GetContactSystemDataDocument,
        variables: { pageIdPrefix },
    });

    interface MapData {
        coordinates: [number, number];
        type: "Point";
    }

    const mapData: MapData = contact.coordinates;
    const { coordinates } = mapData;
    coordinates.reverse();

    return {
        ...contact,
        contactPhoto: directusImageParams({
            ...defaultNull(contact.contactPhoto),
            alt: "contact",
            assetParams: { quality: 50, width: 720 },
        }),
        coordinates,
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};
