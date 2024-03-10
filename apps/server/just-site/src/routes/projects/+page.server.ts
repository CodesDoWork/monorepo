import { config } from "../../config";
import type { Project } from "../../types/Project";
import type { PageServerLoad } from "./$types";
import { env } from "../../env";
import type { Endpoints } from "@octokit/types";

type Repo = Endpoints["GET /user/repos"]["response"]["data"][number];
type Contributors = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];

const githubRequest = {
    headers: env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {},
};

export const load: PageServerLoad = async ({ fetch }) =>
    fetch("https://api.github.com/user/repos", githubRequest)
        .then(res => res.json())
        .then(filterReposByContribution)
        .then(makeProjectList)
        .then(repos => ({ repos }));

async function filterReposByContribution(repos: Repo[]) {
    const reposToRemove = [];
    for (const repo of repos) {
        if (!(await hasContributedToRepo(repo))) {
            reposToRemove.push(repo);
        }
    }

    return repos.filter(repo => !reposToRemove.includes(repo));
}

async function hasContributedToRepo(repo: Repo): Promise<boolean> {
    const contributors: Contributors = await fetch(
        `https://api.github.com/repos/${repo.full_name}/contributors`,
        githubRequest,
    ).then(res => res.json());

    return contributors.find(contributor => contributor.login === config.githubUser) !== undefined;
}

function makeProjectList(repos: Repo[]): Project[] {
    return repos
        .map(repoToProject)
        .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
        .sort((a, b) => b.stars - a.stars);
}

function repoToProject(repo: Repo): Project {
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
}
