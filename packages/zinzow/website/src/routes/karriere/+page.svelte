<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1 } from "../../components/heading";
    import Paragraphs from "../../components/text/paragraphs.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { careerBenefits, vacancies, texts, career } = $derived(data);
</script>

<WidthBox class="isolate">
    <H1>{texts.title}</H1>
    <div class="mt-8">
        <Paragraphs text={texts.identityAndCulture} />
    </div>
    <ol
        class="
            mt-4 grid list-inside list-disc
            md:mt-16 md:list-none md:grid-cols-2 md:gap-16 md:px-24
        ">
        {#each careerBenefits as benefit}
            <li
                class="
                    text-xl text-(--primary)
                    md:text-center md:text-2xl
                ">
                {benefit.title}
            </li>
        {/each}
    </ol>
    <DirectusImage
        img={career.teamPhoto}
        class="
            mx-auto mt-16 aspect-2/1 w-full rounded-lg shadow-lg
            md:mt-32 md:w-3/4
        " />
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
</WidthBox>
