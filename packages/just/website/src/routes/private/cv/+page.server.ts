import type { PageServerLoad } from "./$types";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../../../env";
import { queryDefault } from "../../../graphql/default/client";
import { GetCvDataDocument } from "../../../graphql/default/generated/graphql";
import { mapSocial } from "../../../lib/server/map-socials";

export const load: PageServerLoad = async () => {
    const data = await queryDefault({
        query: GetCvDataDocument,
        fetchPolicy: "no-cache",
    });
    const { about, cv, info } = data;

    const portrait = directusImageParams(env.CMS_URL, {
        ...defaultNull(about.portrait),
        alt: "portrait",
    });
    const socials = cv.socials.map(s => mapSocial(s.social));
    const technologies = cv.technologies.map(({ technology }) => technology);
    const experiences = cv.experiences.map(({ experience }) => ({
        ...experience,
        logo: directusImageParams(env.CMS_URL, {
            ...defaultNull(experience.logo),
            alt: "logo",
        }),
    }));

    return { ...info, ...about, ...cv, portrait, socials, technologies, experiences };
};
