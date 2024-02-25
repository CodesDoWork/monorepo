import { hash } from "../../helpers/hash";
import { config } from "../../config";

export async function load() {
    const portraitSrc = `https://gravatar.com/avatar/${await hash(config.contact.socials.Email)}?size=512`;

    return { portraitSrc };
}
