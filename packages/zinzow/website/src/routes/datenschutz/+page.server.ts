import type { PageServerLoad } from "./$types";
import { formatWYSIWYG } from "@cdw/monorepo/shared-utils/html/common";
import { queryDefault } from "../../graphql/default/client";
import { GetPrivacyPolicyDataDocument } from "../../graphql/default/generated/graphql";
import { stylesMap } from "../../lib/common/styles";

export const load: PageServerLoad = async () => {
    const { privacyPolicy } = await queryDefault({ query: GetPrivacyPolicyDataDocument });

    return { content: formatWYSIWYG(stylesMap, privacyPolicy.content) };
};
