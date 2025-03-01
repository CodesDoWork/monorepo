import type {
    DirectusBook,
    PageInfoDto,
    WorkExperienceDto,
    WorkExperienceWorkProjectsIdDto,
} from "./dtos";

export type PageInfo = Omit<PageInfoDto, "keywords" | "socials" | "technologies"> & {
    keywords: string[];
    socials: PageInfoSocials[];
    technologies: PageInfoTechnologies;
};

export interface PageInfoSocials {
    name: string;
    href: string;
    title: string;
    icon: string;
    tone: string;
    platform: string;
}

export type PageInfoTechnologies = Record<string, string[]>;

export type WorkExperience = Omit<WorkExperienceDto, "technologies" | "projects"> & {
    technologies: string[];
    projects: WorkExperienceWorkProjectsIdDto[];
};

export interface Book extends Omit<DirectusBook, "cover"> {
    url: string;
    authors: (string | OpenLibraryBookAuthor)[];
    cover: string | { medium: string };
    subtitle?: string;
    subjects?: OpenLibrarySubject[];
}

interface OpenLibraryBookAuthor {
    url: string;
    name: string;
}

interface OpenLibrarySubject {
    name: string;
}
