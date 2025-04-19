import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetPrivacyPolicyServerData } from "../../graphql/default/generated/gql";

export const load: PageServerLoad = async ({ parent }) => {
    const { currentLanguage } = await parent();
    const { privacyPolicy } = flattenTranslations(
        await toPromise(
            GetPrivacyPolicyServerData({ variables: { language: currentLanguage.code } }),
        ),
    );

    return { html: styleHtml(privacyPolicy.html) };
};

interface Replacer {
    pattern: RegExp;
    replacement: string;
}

const replacers: Replacer[] = [
    {
        pattern: /<h3.*?>/g,
        replacement: "<h3 class='mt-8 mb-4 text-lg md:text-xl xl:text-2xl'>",
    },
    {
        pattern: /<h4.*?>/g,
        replacement: "<h4 class='mt-6 mb-3 lg:text-lg xl:text-xl'>",
    },
    {
        pattern: /<h5.*?>/g,
        replacement: "<h5 class='mt-4 mb-2 lg:text-lg'>",
    },
    {
        pattern: /<p.*?>/g,
        replacement: "<p class='mb-2 md:text-justify text-slate-700 dark:text-slate-300'>",
    },
    {
        pattern: /<ul.*?>/g,
        replacement: "<ul class='list-disc list-outside ml-8 mb-2'>",
    },
    {
        pattern: /<li.*?>/g,
        replacement: "<li class='md:text-justify text-slate-700 dark:text-slate-300'>",
    },
    {
        pattern: /<a /g,
        replacement: "<a class='text-accent-500 hover:underline' ",
    },
];

function styleHtml(html: string): string {
    replacers.forEach(replacer => (html = html.replace(replacer.pattern, replacer.replacement)));
    return html;
}
