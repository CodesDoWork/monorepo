import { hash } from "../../helpers/hash";
import { getDirectus, getWorkExperience } from "../../helpers/directus";
import type { PageServerLoad } from "./$types";
import { LayoutData } from "../+layout.server";

export const load: PageServerLoad = async ({ parent }) => {
    const directus = await getDirectus();
    const workExperience = await getWorkExperience(directus);

    const parentData: LayoutData = await parent();
    const { siteInfo } = parentData;

    const email = siteInfo.socials.find(s => s.platform === "Email").name;
    const portraitSrc = `https://gravatar.com/avatar/${await hash(email)}?size=512`;

    return { workExperience, portraitSrc };
};
