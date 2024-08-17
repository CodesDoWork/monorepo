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
    authors: Author[];
    cover:
        | string
        | {
              medium: string;
          };
    subtitle?: string;
    subjects?: {
        name: string;
        url: string;
    }[];
}

type Author =
    | {
          name: string;
          url: string;
      }
    | string;

export interface Project {
    thumbnail?: string;
    name: string;
    description?: string;
    language: string;
    stars: number;
    createdAt: Date;
    updatedAt?: Date;
    license?: string;
    homepage?: string;
    url: string;
}

export interface Route {
    name: string;
    route: string;
    description: string;
    color: string;
    is_hero: boolean;
    in_nav: boolean;
}
