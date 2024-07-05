import { hash } from "../../helpers/hash";
import { getDirectus, getRoutes, getSiteInfo, getWorkExperience } from "../../helpers/directus";

export async function load() {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const routes = await getRoutes(directus);
    const workExperience = await getWorkExperience(directus);

    const email = siteInfo.socials.find(s => s.platform === "Email").name;
    const portraitSrc = `https://gravatar.com/avatar/${await hash(email)}?size=512`;

    return { siteInfo, routes, workExperience, portraitSrc };
}
