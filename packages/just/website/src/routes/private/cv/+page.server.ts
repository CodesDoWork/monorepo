import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { GetCvData } from "../../../graphql/default/generated/gql";
import { mapSocial } from "../../../shared/mapSocials";

export const load: PageServerLoad = async () => {
    const { about, cv, info } = await toPromise(GetCvData({ fetchPolicy: "no-cache" }));

    const socials = cv.socials.map(s => mapSocial(s.social));

    return { ...info, ...about, ...cv, socials };
};
