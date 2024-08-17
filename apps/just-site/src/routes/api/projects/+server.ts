import type { JustSiteProjectData } from "$directus";
import type { Endpoints } from "@octokit/types";
import { env } from "../../../env";
import { getDirectus, getProjectData, getSiteInfo } from "../../../helpers/directus";
import type { Project } from "../../../types/frontend";

export async function GET() {
    const directus = await getDirectus();
    const siteInfo = await getSiteInfo(directus);
    const projectData = await getProjectData(directus);

    const githubUser = siteInfo.socials.find(s => s.platform === "GitHub")?.name;
    if (!githubUser) {
        return new Response(JSON.stringify([]));
    }

    const projects = await fetch("https://api.github.com/user/repos", githubRequest)
        .then(res => res.json())
        .then(filterReposByContribution(githubUser))
        .then(makeProjectList(projectData));

    return new Response(JSON.stringify(projects));
}

type Repo = Endpoints["GET /user/repos"]["response"]["data"][number];
type Contributors = Endpoints["GET /repos/{owner}/{repo}/contributors"]["response"]["data"];

const githubRequest = {
    headers: { Authorization: `Bearer ${env.GITHUB_TOKEN}` },
};

function filterReposByContribution(githubUser: string) {
    return async function (repos: Repo[]) {
        const reposToRemove: Repo[] = [];
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
            .sort(
                (a, b) =>
                    (b.updatedAt || b.createdAt)?.getTime() -
                    (a.updatedAt || a.createdAt).getTime(),
            )
            .sort((a, b) => b.stars - a.stars);
    };
}

function repoToProject(projectData: JustSiteProjectData[]) {
    return function (repo: Repo): Project {
        const projectComplimentaryData = projectData.find(
            p => p.name.toLocaleLowerCase() === repo.name.toLocaleLowerCase(),
        );

        return {
            name: projectComplimentaryData?.name || repo.name,
            thumbnail: projectComplimentaryData?.thumbnail as string | undefined,
            url: repo.html_url,
            description: repo.description || undefined,
            createdAt: new Date(repo.created_at as string),
            updatedAt: repo.pushed_at ? new Date(repo.pushed_at) : undefined,
            homepage: repo.homepage || undefined,
            language: repo.language || "Unknown",
            license: repo.license?.name,
            stars: repo.stargazers_count,
        };
    };
}
