import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { GetCvData } from "../../../graphql/default/generated/gql";
import { assetUrl } from "../../../shared/assets";
import { mapSocial } from "../../../shared/mapSocials";

export const load: PageServerLoad = async () => {
    const { about, cv, info } = await toPromise(GetCvData({ fetchPolicy: "no-cache" }));

    about.portrait = assetUrl(about.portrait);
    const socials = cv.socials.map(s => mapSocial(s.social));
    const technologies = cv.technologies.map(({ technology }) => technology);

    return { ...info, ...about, ...cv, socials, technologies };
};
