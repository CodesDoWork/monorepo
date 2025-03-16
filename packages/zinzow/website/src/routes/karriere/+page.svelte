<script lang="ts">
    import type { PageData } from "./$types";
    import { PageContent } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import Paragraphs from "../../components/text/paragraphs.svelte";

    interface Props {
        data: PageData;
    }

    let { data }: Props = $props();
    const { careerBenefits, vacancies, texts } = data;
</script>

<PageContent class="isolate">
    <H1>{texts.title}</H1>
    <div class="mt-8">
        <Paragraphs text={texts.identityAndCulture} />
    </div>
    <ol class="mt-16 grid grid-cols-2 gap-16 px-24">
        {#each careerBenefits as benefit}
            <dl>
                <dt class="text-accent-600 text-center text-2xl">{benefit.title}</dt>
                <dd class="mt-2 w-full text-center text-gray-600 dark:text-gray-500">
                    {benefit.description}
                </dd>
            </dl>
        {/each}
    </ol>
    <ol class="mt-16">
        {#each vacancies as vacancy}
            <p>{vacancy.title}</p>
            <p>{vacancy.description}</p>
            <p>{vacancy.responsibilities}</p>
            <p>{vacancy.profile}</p>
            <a href={vacancy.attachment?.url} rel="noopener noreferrer" target="_blank">
                Download
            </a>
        {/each}
    </ol>
</PageContent>
