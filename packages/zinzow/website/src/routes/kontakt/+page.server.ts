import type { $ZodErrorTree } from "zod/v4/core";
import type { Actions, PageServerLoad } from "./$types";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { z } from "zod";
import { queryDefault } from "../../graphql/default/client";
import { GetContactDataDocument } from "../../graphql/default/generated/graphql";
import { querySystem } from "../../graphql/system/client";
import { GetContactSystemDataDocument } from "../../graphql/system/generated/graphql";
import { directusImageParams } from "../../lib/common/directus-image";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";
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
        acceptPrivacyPolicy: formatWYSIWYG(contact.acceptPrivacyPolicy),
        contactPhoto: directusImageParams({
            ...defaultNull(contact.contactPhoto),
            alt: "contact",
            assetParams: { quality: 50, width: 720 },
        }),
        coordinates,
        texts: getTextsFromTranslations(translations, pageIdPrefix),
    };
};

const zMessage = z
    .object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.email(),
        message: z.string(),
        privacy: z.coerce.boolean(),
        attachments: z.array(z.file()),
    })
    .strict();
type Message = z.infer<typeof zMessage>;

export const actions: Actions = {
    mail: async event => {
        const formData = await event.request.formData();
        const data = {
            firstName: formData.get("firstName").toString(),
            lastName: formData.get("lastName").toString(),
            email: formData.get("email").toString(),
            message: formData.get("message").toString(),
            privacy: formData.get("privacy") === "on",
            attachments: formData.getAll("attachments") as File[],
        };
        const { attachments, ...nonAttachmentData } = data;
        const msgResult = zMessage.safeParse(data);
        if (!msgResult.success) {
            return { data: nonAttachmentData, errors: z.treeifyError(msgResult.error).properties };
        }

        if (!msgResult.data.privacy) {
            const privacyErrors: $ZodErrorTree<Message>["properties"] = {
                privacy: { errors: ["must be checked"] },
            };
            return { data: nonAttachmentData, errors: privacyErrors };
        }

        return { success: true }; // processMessage(event, msgResult.data);
    },
};
