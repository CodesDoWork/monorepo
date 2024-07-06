import { getDirectus, getProjectData, getSiteInfo } from "../../../helpers/directus";
import type { Endpoints } from "@octokit/types";
import { env } from "../../../env";
import { JustSiteProjectData } from "../../../types/directus";

export async function GET() {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const projectData = await getProjectData(directus);

    const githubUser = siteInfo.socials.find(s => s.platform === "GitHub").name;

    const projects = await fetch("https://api.github.com/user/repos", githubRequest)
        .then(res => res.json())
        .then(filterReposByContribution(githubUser))
        .then(makeProjectList(projectData));

    return new Response(JSON.stringify(projects));
}

type Repo = Endpoints["GET /user/repos"]["response"]["data"][number];
type Contributors = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];

const githubRequest = {
    headers: env.GITHUB_TOKEN ? { Authorization: `Bearer ${env.GITHUB_TOKEN}` } : {},
};

function filterReposByContribution(githubUser: string) {
    return async function (repos: Repo[]) {
        const reposToRemove = [];
        for (const repo of repos) {
            if (!(await hasContributedToRepo(githubUser, repo))) {
                reposToRemove.push(repo);
            }
        }

        return repos.filter(repo => !reposToRemove.includes(repo));
    };
}

async function hasContributedToRepo(githubUser: string, repo: Repo): Promise<boolean> {
    const contributors: Contributors = await fetch(repo.contributors_url, githubRequest).then(res =>
        res.json(),
    );

    return contributors.find(contributor => contributor.login === githubUser) !== undefined;
}

function makeProjectList(projectData: JustSiteProjectData[]) {
    return function (repos: Repo[]): Project[] {
        return repos
            .map(repoToProject(projectData))
            .sort((a, b) => b.updatedAt.getTime() - a.updatedAt.getTime())
            .sort((a, b) => b.stars - a.stars);
    };
}

function repoToProject(projectData: JustSiteProjectData[]) {
    return function (repo: Repo): Project {
        const projectComplimentaryData =
            projectData.find(p => p.name.toLocaleLowerCase() === repo.name.toLocaleLowerCase()) ||
            {};

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
    };
}
