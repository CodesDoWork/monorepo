import type { PageServerLoad } from "./$types";
import { defaultClient } from "../../../graphql/default/client";
import { GetCvDataDocument } from "../../../graphql/default/generated/graphql";
import { assetUrl } from "@cdw/monorepo/shared-utils/directus";
import { mapSocial } from "../../../shared/mapSocials";

export const load: PageServerLoad = async () => {
    const { data } = await defaultClient.query({
        query: GetCvDataDocument,
        fetchPolicy: "no-cache",
    });
    const { about, cv, info } = data;

    about.portrait = assetUrl(about.portrait);
    const socials = cv.socials.map(s => mapSocial(s.social));
    const technologies = cv.technologies.map(({ technology }) => technology);

    cv.experiences.forEach(exp => {
        exp.experience.logo = assetUrl(exp.experience.logo);
    });

    return { ...info, ...about, ...cv, socials, technologies };
};
