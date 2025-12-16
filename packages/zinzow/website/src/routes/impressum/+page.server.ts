import type { PageServerLoad } from "./$types";
import { queryDefault } from "../../graphql/default/client";
import { GetImprintDataDocument } from "../../graphql/default/generated/graphql";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";

export const load: PageServerLoad = async () => {
    const { imprint } = await queryDefault({ query: GetImprintDataDocument });

    return { content: formatWYSIWYG(imprint.content) };
};
