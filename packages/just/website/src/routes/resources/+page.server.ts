import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetResourcesServerData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage } = await parent();
    const { resources, sections } = flattenTranslations(
        await toPromise(GetResourcesServerData({ variables: { language: currentLanguage.code } })),
    );

    sections.forEach(section =>
        section.items.forEach(item => {
            item.file = assetUrl(item.file);
        }),
    );

    return { resources, sections };
};
