import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { GetHomePageServerData } from "../graphql/default/generated/gql";
import { mapSocial } from "../shared/mapSocials";

export const load: PageServerLoad = async () => {
    const { contact } = await toPromise(GetHomePageServerData({}));
    return { socials: contact.socials.map(s => s.socialsId).map(mapSocial) };
};
