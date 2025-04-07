import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { GetAboutServerDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetAboutServerData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage } = await parent();
    const { contact, about, workExperience } = flattenTranslations(
        await toPromise(GetAboutServerData({ variables: { language: currentLanguage.code } })),
    );

    const portraitSrc = await getPortraitSrc(contact.socials[0].social.name);
    const techStack = buildTechStack(about.technologies);

    sanitzeWorkExperience(workExperience);
    about.bio = replaceLinks(about.bio);

    return { portraitSrc, about, workExperience, techStack };
};

async function getPortraitSrc(email: string) {
    return `https://gravatar.com/avatar/${await hash(email)}?size=512`;
}

async function hash(s: string) {
    const utf8 = new TextEncoder().encode(s);
    const hashBuffer = await crypto.subtle.digest("SHA-256", utf8);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(bytes => bytes.toString(16).padStart(2, "0")).join("");
}

function buildTechStack(
    technologies: FlatTrans<GetAboutServerDataQuery["about"]["technologies"]>,
): Record<string, FlatTrans<GetAboutServerDataQuery["about"]["technologies"]>> {
    const techStacks: string[] = [];
    technologies.sort((a, b) => a.technology.name.localeCompare(b.technology.name));
    technologies.forEach(t =>
        t.technology.techStacks.forEach(ts => techStacks.push(ts.techStack.name)),
    );

    techStacks.sort((a, b) => a.localeCompare(b));
    return techStacks.reduce(
        (all, stack) => ({
            ...all,
            [stack]: technologies.filter(t =>
                t.technology.techStacks.find(ts => ts.techStack.name === stack),
            ),
        }),
        {},
    );
}

function sanitzeWorkExperience(
    workExperience: FlatTrans<GetAboutServerDataQuery["workExperience"]>,
) {
    workExperience.sort(
        (e1, e2) => (e1.endYear || 1) - (e2.endYear || 1) || e2.startYear - e1.startYear,
    );
    workExperience.forEach(e => {
        e.company.logo = assetUrl(e.company.logo);
        e.projects.forEach(p => (p.project.logo = assetUrl(p.project.logo)));
    });
}

function replaceLinks(text: string) {
    return text.replace(/<a /g, '<a class="text-[var(--page-color)] hover:underline" ');
}
