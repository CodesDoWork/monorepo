export type SupportedSocials =
    | "GitHub"
    | "LinkedIn"
    | "Instagram"
    | "YouTube"
    | "Gravatar"
    | "Email";

export interface SocialNetwork {
    name: SupportedSocials;
    icon: string;
    tone: string;
    link: string;
    noAt?: boolean;
}

export type Usernames = {
    [key in SupportedSocials]: string;
};
