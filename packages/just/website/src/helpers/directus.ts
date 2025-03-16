import type { CustomDirectusTypes, JustSiteRoutes } from "@cdw/monorepo/just-cms-types";
import type {
    DirectusBook,
    JustSiteBlogEntriesDto,
    JustSiteBookDto,
    PageInfoDto,
    WorkExperienceDto,
    WorkExperienceWorkProjectsIdDto,
} from "../types/dtos";
import type {
    PageInfo,
    PageInfoSocials,
    PageInfoTechnologies,
    WorkExperience,
} from "../types/frontend";
import { authentication, createDirectus, readItems, readSingleton, rest } from "@directus/sdk";
import { env } from "../env";

const directus = createDirectus<CustomDirectusTypes>(env.CMS_URL)
    .with(rest())
    .with(authentication());

export type Directus = typeof directus;

export async function getDirectus(): Promise<Directus> {
    return directus.getToken().then(async token => {
        if (!token) {
            await directus.login(env.CMS_USER, env.CMS_PASSWORD);
        }

        return directus;
    });
}

function assetUrl(id: string) {
    return `${env.CMS_URL}/assets/${id}`;
}

function replaceLinks(text: string) {
    return text.replace(/<a /g, '<a class="text-[var(--page-color)] hover:underline" ');
}

export function getSiteInfo(directus: Directus): Promise<PageInfo> {
    return directus
        .request(
            readSingleton("just_site_info", {
                fields: [
                    "*",
                    {
                        socials: [
                            {
                                socials_id: [
                                    "*",
                                    {
                                        platform: ["*"],
                                    },
                                ],
                            },
                        ],
                    },
                    {
                        technologies: [
                            {
                                technologies_id: [
                                    "*",
                                    { tech_stacks: [{ tech_stack_id: ["name"] }] },
                                ],
                            },
                        ],
                    },
                    {
                        project_platform: ["*"],
                    },
                ],
            }),
        )
        .then(res => res as PageInfoDto)
        .then(pageInfo => {
            const socials: PageInfoSocials[] = pageInfo.socials.map(s => {
                const social = s.socials_id;
                const { platform } = social;

                return {
                    name: social.name,
                    href: `${platform.base_user_link}${social.name}`,
                    title: `${platform.display_at ? "@" : ""}${social.name} on ${platform.name}`,
                    icon: platform.icon,
                    tone: platform.tone,
                    platform: platform.name,
                };
            });

            const techStacks = pageInfo.technologies.reduce(
                (stacks, t) => {
                    const technology = t.technologies_id;
                    technology.tech_stacks.forEach(({ tech_stack_id: stack }) => {
                        if (!stacks[stack.name]) {
                            stacks[stack.name] = [];
                        }
                        stacks[stack.name].push(technology.name);
                    });

                    return stacks;
                },
                {} as Record<string, string[]>,
            );
            const sortedTechStackKeys = Object.keys(techStacks).sort();
            const technologies: PageInfoTechnologies = sortedTechStackKeys.reduce(
                (stacks, key) => {
                    stacks[key] = techStacks[key];
                    return stacks;
                },
                {} as typeof techStacks,
            );

            pageInfo.about_bio = replaceLinks(pageInfo.about_bio);

            return {
                ...pageInfo,
                keywords: pageInfo.keywords as string[],
                socials,
                technologies,
            } satisfies PageInfo;
        });
}

export function getRoutes(directus: Directus): Promise<JustSiteRoutes[]> {
    return directus.request(
        readItems("just_site_routes", {
            fields: ["name", "route", "description", "color", "is_hero", "in_nav"],
        }),
    ) as Promise<JustSiteRoutes[]>;
}

export function getWorkExperience(directus: Directus): Promise<WorkExperience[]> {
    return directus
        .request(
            readItems("just_site_work_experience", {
                fields: [
                    "job_title",
                    "start_year",
                    "end_year",
                    "responsibilities",
                    {
                        company: ["name", "url", "logo"],
                        technologies: [{ technologies_id: ["*"] }],
                        projects: [
                            { just_site_work_projects_id: ["name", "logo", "description", "link"] },
                        ],
                    },
                ],
            }),
        )
        .then(res => res as WorkExperienceDto[])
        .then(experiences =>
            experiences
                .map(experience => {
                    experience.company.logo = assetUrl(experience.company.logo as string);
                    const technologies = experience.technologies
                        .map(t => t.technologies_id.name)
                        .sort();
                    const projects: WorkExperienceWorkProjectsIdDto[] = experience.projects.map(
                        p => {
                            const project = p.just_site_work_projects_id;
                            project.logo = assetUrl(project.logo);
                            return project;
                        },
                    );

                    return { ...experience, technologies, projects } satisfies WorkExperience;
                })
                .sort(
                    (e1, e2) =>
                        (e1.end_year || 1) - (e2.end_year || 1) || e2.start_year - e1.start_year,
                ),
        );
}

export function getProjectData(directus: Directus) {
    return directus.request(readItems("just_site_project_data")).then(projectData => {
        projectData.forEach(project => (project.thumbnail = assetUrl(project.thumbnail as string)));

        return projectData;
    });
}

export function getBooks(directus: Directus): Promise<DirectusBook[]> {
    return directus
        .request(
            readItems("just_site_books", {
                fields: ["*", { book_categories: [{ just_site_book_categories_id: ["*"] }] }],
            }),
        )
        .then(res => res as JustSiteBookDto[])
        .then(books =>
            books.map(book => ({
                ...book,
                cover: book.cover ? assetUrl(book.cover as string) : undefined,
                categories:
                    book.book_categories?.map(c => c.just_site_book_categories_id.name) || [],
            })),
        );
}

export function getBlogPosts(directus: Directus): Promise<JustSiteBlogEntriesDto[]> {
    return directus.request(readItems("just_site_blog_entries")).then(posts => {
        posts.forEach(p => (p.cover = assetUrl(p.cover as string)));
        return posts as JustSiteBlogEntriesDto[];
    });
}

export function getBlogPost(
    directus: Directus,
    slug: string,
): Promise<JustSiteBlogEntriesDto | undefined> {
    return directus
        .request(
            readItems("just_site_blog_entries", {
                filter: { slug: { _eq: slug } },
            }),
        )
        .then(posts => posts[0])
        .then(p => {
            if (p) {
                p.cover = assetUrl(p.cover as string);
                p.content = replaceLinks(p.content);
            }

            return p as JustSiteBlogEntriesDto | undefined;
        });
}
