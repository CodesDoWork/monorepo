<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1, H4 } from "../../components/heading";
    import { Paragraphs } from "../../components/text";
    import { aHoverAnimation } from "../../lib/common/typography";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { careerBenefits, texts, career } = $derived(data);
</script>

<WidthBox class="isolate">
    <H1>{texts.title}</H1>
    <Paragraphs text={texts.identityAndCulture} />
    <ul
        class="
            mx-auto mt-4 grid w-fit list-outside list-disc
            sm:mt-12 sm:grid-cols-2
            md:mt-16 md:gap-4
            lg:gap-8
        ">
        {#each careerBenefits as benefit}
            <li class="">
                <H4
                    class={clsx(
                        aHoverAnimation,
                        `
                            relative inline-block origin-left cursor-default transition-all
                            hover:scale-104 hover:text-(--primary-900)
                            dark:hover:text-(--primary-400)
                        `,
                    )}>
                    {benefit.title}
                </H4>
            </li>
        {/each}
    </ul>
    <DirectusImage
        img={career.teamPhoto}
        imgClass="rounded-lg shadow-lg"
        class="
            mx-auto mt-16 aspect-2/1 w-full
            sm:mt-24
            md:w-3/4
        " />
</WidthBox>
