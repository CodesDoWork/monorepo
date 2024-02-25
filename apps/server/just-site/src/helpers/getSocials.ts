import { config } from "../config";
import { socialNetworks } from "../constants";

export function getSocials() {
    return Object.entries(config.contact.socials).map(([platform, user]) => {
        const socialNetwork = socialNetworks.find(sn => sn.name === platform);
        if (!socialNetwork) {
            return null;
        }

        return {
            ...socialNetwork,
            user,
            href: socialNetwork.link + user,
            title: `${socialNetwork.noAt ? "" : "@"}${user} on ${socialNetwork.name}`,
        };
    });
}
