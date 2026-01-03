import type { SocialFragment } from "../../graphql/default/generated/graphql";

export function mapSocial(social: SocialFragment) {
    const { platform } = social;

    return {
        name: social.name,
        href: `${platform.baseUserLink}${social.name}`,
        title: `${platform.displayAt ? "@" : ""}${social.name} on ${platform.name}`,
        icon: platform.icon,
        tone: platform.tone,
        platform: platform.name,
    };
}
