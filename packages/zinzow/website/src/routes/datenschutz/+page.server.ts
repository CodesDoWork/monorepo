import type { PageServerLoad } from "./$types";
import { queryDefault } from "../../graphql/default/client";
import { GetPrivacyPolicyDataDocument } from "../../graphql/default/generated/graphql";
import { formatWYSIWYG } from "../../lib/server/wysiwyg";

export const load: PageServerLoad = async () => {
    const { privacyPolicy } = await queryDefault({ query: GetPrivacyPolicyDataDocument });

    return { content: formatWYSIWYG(privacyPolicy.content) };
};
