import { env } from "../../env";
import { getDirectus, getWorkExperience } from "../../helpers/directus";
import { hash } from "../../helpers/hash";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const directus = await getDirectus();
    const workExperience = await getWorkExperience(directus);

    const portraitSrc = `https://gravatar.com/avatar/${await hash(env.GRAVATAR_EMAIL)}?size=512`;

    return { workExperience, portraitSrc };
};
