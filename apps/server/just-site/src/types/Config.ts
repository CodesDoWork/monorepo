import type { Usernames } from "./Socials";
import { MyBook } from "./Book";

export interface Config {
    title: string;
    githubUser: string;
    routeLinks: RouteLink[];
    footerInfo: FooterInfo;
    readingList: MyBook[];
    contact: Contact;
    projectComplimentaryData: ProjectComplimentaryData[];
    about: AboutInfo;
}

export interface RouteLink {
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

interface AboutInfo {
    intro: string;
    bio: string[];
    techStack: Record<string, string[]>;
    workExperience: WorkExperience[];
}

interface WorkExperience {
    jobTitle: string;
    company: string;
    companyUrl: string;
    companyLogo: string;
    datesWorked: string;
    responsibilities?: string;
    projectType?: "Projects" | "Clients" | string;
    projects?: {
        name: string;
        logo: string;
        description: string;
        link: string;
    }[];
    technologies?: string[];
}
