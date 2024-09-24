import type {
    DirectusBook,
    PageInfoDto,
    WorkExperienceDto,
    WorkExperienceWorkProjectsIdDto,
} from "./dtos";

export type PageInfo = Omit<PageInfoDto, "socials" | "technologies"> & {
    socials: PageInfoSocials[];
    technologies: PageInfoTechnologies;
};

export type PageInfoSocials = {
    name: string;
    href: string;
    title: string;
    icon: string;
    tone: string;
    platform: string;
};

export type PageInfoTechnologies = Record<string, string[]>;

export type WorkExperience = Omit<WorkExperienceDto, "technologies" | "projects"> & {
    technologies: string[];
    projects: WorkExperienceWorkProjectsIdDto[];
};

export interface Book extends Omit<DirectusBook, "cover"> {
    url: string;
    authors: string[];
    cover:
        | string
        | {
              medium: string;
          };
    subtitle?: string;
    subjects?: string[];
}
