import { GetHomePageServerData } from "../graphql/default/generated/gql";
import { mapSocials } from "../shared/mapSocials";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";

export const load: PageServerLoad = async () => {
    const { contact } = await toPromise(GetHomePageServerData({}));
    return { socials: mapSocials(contact.socials.map(s => s.socialsId)) };
};
