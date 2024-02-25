import type { SocialNetwork } from "./types/Socials";

export const socialNetworks: SocialNetwork[] = [
    {
        name: "GitHub",
        icon: "mdi:github",
        tone: "#585858",
        link: "https://github.com/",
    },
    {
        name: "LinkedIn",
        icon: "mdi:linkedin",
        tone: "#0A66C2",
        link: "https://www.linkedin.com/in/",
        noAt: true,
    },
    {
        name: "Instagram",
        icon: "mdi:instagram",
        tone: "#E4405F",
        link: "https://www.instagram.com/",
    },
    {
        name: "YouTube",
        icon: "mdi:youtube",
        tone: "#FF0000",
        link: "https://www.youtube.com/c/",
        noAt: true,
    },
    {
        name: "Email",
        icon: "mdi:email",
        tone: "#0ea5e9",
        link: "mailto:",
        noAt: true,
    },
];
