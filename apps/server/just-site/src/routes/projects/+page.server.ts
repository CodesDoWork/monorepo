import { config } from "../../config";
import { GITHUB_TOKEN } from "$env/static/private";
import type { Project } from "../../types/Project";
import type { PageServerLoad } from "./$types";

export const prerender = true;

const makeProjectList = async (ghResponse: any): Promise<Project[]> => {
    if (!ghResponse || !Array.isArray(ghResponse)) return [];
    return ghResponse
        .map((repo: any) => {
            const projectComplimentaryData =
                config.projectComplimentaryData.find(
                    p => p.name.toLocaleLowerCase() === repo.name.toLocaleLowerCase(),
                ) || {};
            return {
                id: repo.id,
                name: repo.name,
                user: repo.owner.login,
                url: repo.html_url,
                description: repo.description,
                isFork: repo.fork,
                createdAt: new Date(repo.created_at),
                updatedAt: new Date(repo.pushed_at),
                homepage: repo.homepage,
                language: repo.language,
                license: repo.license?.name,
                size: repo.size,
                stars: repo.stargazers_count,
                forks: repo.forks_count,
                issues: repo.open_issues_count,
                topics: repo.topics,
                archived: repo.archived,
                ...projectComplimentaryData, // Append and merge with any hard-coded data from config
            };
        })
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .sort((a, b) => {
            return b.stars - a.stars;
        });
};

export const load: PageServerLoad = async ({ fetch }) => {
    const githubRequest = {
        headers: GITHUB_TOKEN ? { Authorization: `Bearer ${GITHUB_TOKEN}` } : {},
    };

    const repos = await fetch("https://api.github.com/user/repos", githubRequest)
        .then((res: any) => res.json())
        .then(async repos => {
            const reposToRemove = [];
            for (const repo of repos) {
                if (repo.owner.login !== config.githubUser) {
                    const contributors = await fetch(
                        `https://api.github.com/repos/${repo.full_name}/contributors`,
                        githubRequest,
                    ).then(res => res.json());

                    if (
                        !contributors.find(contributor => contributor.login === config.githubUser)
                    ) {
                        reposToRemove.push(repo);
                    }
                }
            }

            return repos.filter(repo => !reposToRemove.includes(repo));
        })
        .then(makeProjectList);

    return { repos };
};
