import {
    authentication,
    createDirectus,
    readItem,
    readItems,
    readSingleton,
    rest,
} from "@directus/sdk";
import { CustomDirectusTypes } from "../types/directus";
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

const publishedFilter = { filter: { status: { _eq: "published" } } };

function assetUrl(id: string) {
    return `/assets/${id}`;
}

export function getSiteInfo(directus: Directus) {
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
                ],
            }),
        )
        .then(async pageInfo => {
            pageInfo.socials = pageInfo.socials.map(s => {
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

            pageInfo.technologies = pageInfo.technologies.reduce((stacks, t) => {
                const technology = t.technologies_id;
                technology.tech_stacks.forEach(({ tech_stack_id: stack }) => {
                    if (!stacks[stack.name]) {
                        stacks[stack.name] = [];
                    }
                    stacks[stack.name].push(technology.name);
                });

                return stacks;
            }, {});
            const sortedTechStackKeys = Object.keys(pageInfo.technologies).sort();
            pageInfo.technologies = sortedTechStackKeys.reduce((stacks, key) => {
                stacks[key] = pageInfo.technologies[key];
                return stacks;
            }, {});

            pageInfo.about_bio = pageInfo.about_bio.replace(
                /<a /g,
                '<a class="text-[var(--page-color)] hover:underline" ',
            );

            pageInfo.project_platform = await directus.request(
                readItem(pageInfo.project_platform.collection, pageInfo.project_platform.key),
                { fields: ["name"] },
            );

            return pageInfo;
        });
}

export function getRoutes(directus: Directus) {
    return directus.request(
        readItems("just_site_routes", {
            ...publishedFilter,
            fields: ["name", "route", "description", "color", "is_hero"],
        }),
    );
}

export function getWorkExperience(directus: Directus) {
    return directus
        .request(
            readItems("just_site_work_experience", {
                ...publishedFilter,
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
        .then(experiences => {
            experiences.forEach(experience => {
                experience.company.logo = assetUrl(experience.company.logo as string);
                experience.technologies = experience.technologies.map(t => t.technologies_id.name);
                experience.projects = experience.projects.map(p => {
                    const project = p.just_site_work_projects_id;
                    project.logo = assetUrl(project.logo);
                    return project;
                });
            });

            return experiences.sort(
                (e1, e2) =>
                    (e1.end_year || 1) - (e2.end_year || 1) || e2.start_year - e1.start_year,
            );
        });
}

export function getProjectData(directus: Directus) {
    return directus
        .request(readItems("just_site_project_data", publishedFilter))
        .then(projectData => {
            projectData.forEach(
                project => (project.thumbnail = assetUrl(project.thumbnail as string)),
            );

            return projectData;
        });
}

export function getBooks(directus: Directus) {
    return directus
        .request(
            readItems("just_site_books", {
                ...publishedFilter,
                fields: ["*", { book_categories: [{ just_site_book_categories_id: ["*"] }] }],
            }),
        )
        .then(books => {
            books.forEach(book => {
                if (book.cover) {
                    book.cover = assetUrl(book.cover as string);
                }

                book["categories"] = book.book_categories.map(
                    c => c.just_site_book_categories_id.name,
                );
                delete book.book_categories;
            });

            return books;
        });
}
