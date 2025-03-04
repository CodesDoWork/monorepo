import type {
    JustSiteBlogEntries,
    JustSiteBookCategories,
    JustSiteBooks,
    JustSiteInfo,
    JustSiteWorkExperience,
    SocialNetworks,
    Socials,
    Technologies,
} from "@cdw/monorepo/just-cms-types";

export interface PageInfoDto extends JustSiteInfo {
    socials: PageInfoSocialsDto[];
    technologies: PageInfoTechnologiesDto[];
}

export interface PageInfoSocialsDto {
    socials_id: PageInfoSocialsIdDTO;
}

export interface PageInfoSocialsIdDTO extends Socials {
    platform: SocialNetworks;
}

export interface PageInfoTechnologiesDto {
    technologies_id: PageInfoTechnologiesIDDto;
}

interface PageInfoTechnologiesIDDto extends Technologies {
    tech_stacks: {
        tech_stack_id: {
            name: string;
        };
    }[];
}

export type WorkExperienceDto = Omit<
    JustSiteWorkExperience,
    "company" | "technologies" | "projects"
> & {
    company: {
        name: string;
        url: string;
        logo: string;
    };
    technologies: WorkExperienceTechnologiesDto[];
    projects: WorkExperienceWorkProjectsDto[];
};

export interface WorkExperienceTechnologiesDto {
    technologies_id: {
        name: string;
    };
}

export interface WorkExperienceWorkProjectsDto {
    just_site_work_projects_id: WorkExperienceWorkProjectsIdDto;
}

export interface WorkExperienceWorkProjectsIdDto {
    name: string;
    logo: string;
    description: string;
    link: string;
}

export interface JustSiteBookDto extends JustSiteBooks {
    book_categories: {
        just_site_book_categories_id: JustSiteBookCategories;
    }[];
}

export type DirectusBook = Omit<JustSiteBookDto, "book_categories"> & {
    categories: string[];
};

export type JustSiteBlogEntriesDto = Omit<JustSiteBlogEntries, "cover"> & {
    cover: string;
};
