import type { Usernames } from "./Socials";

export interface Config {
    title: string;
    description: string;
    githubUser: string;
    routeLinks: RouteLink[];
    footerInfo: FooterInfo;
    contact: Contact;
}

interface RouteLink {
    label: string;
    route: string;
    color: string;
    description: string;
    header: boolean;
}

interface FooterInfo {
    author: string;
    authorSite: string;
    license: string;
    licenseLink: string;
}

interface Contact {
    name: string;
    email: string;
    website: string;
    socials: Usernames;
    socialButtonLimit: number;
    mailerConfig: {
        service_id: string;
        template_id: string;
        user_id: string;
        template_params: {
            [key: string]: string;
        };
    };
}
