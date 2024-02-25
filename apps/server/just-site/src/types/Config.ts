import type { Usernames } from "./Socials";

export interface Config {
    title: string;
    githubUser: string;
    routeLinks: RouteLink[];
    footerInfo: FooterInfo;
    contact: Contact;
    projectComplimentaryData: ProjectComplimentaryData[];
}

interface RouteLink {
    label: string;
    route: string;
    color?: string;
    description: string;
    isHero: boolean;
}

interface FooterInfo {
    author: string;
    authorSite: string;
    license: string;
    licenseLink: string;
}

interface Contact {
    name: string;
    socials: Usernames;
}

interface ProjectComplimentaryData {
    name: string;
    thumbnail: string;
}
