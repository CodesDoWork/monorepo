<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1 } from "../../components/heading";
    import { Paragraphs } from "../../components/text";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { careerBenefits, texts, career } = $derived(data);
</script>

<WidthBox class="isolate">
    <H1>{texts.title}</H1>
    <Paragraphs text={texts.identityAndCulture} />
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
        imgClass="rounded-lg shadow-lg"
        class="
            mx-auto mt-16 aspect-2/1 w-full
            sm:mt-24
            md:w-3/4
        " />
</WidthBox>
