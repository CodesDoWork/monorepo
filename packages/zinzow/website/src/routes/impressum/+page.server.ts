import type { PageServerLoad } from "./$types";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { queryDefault } from "../../graphql/default/client";
import { GetImprintDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async () => {
    const { imprint } = await queryDefault({ query: GetImprintDataDocument });

    return { content: formatWYSIWYG(stylesMap, imprint.content) };
};
