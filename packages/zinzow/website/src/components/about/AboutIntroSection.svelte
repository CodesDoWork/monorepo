<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { animationDelay, fadeIn } from "../../lib/client/animate";
    import { splitInHalf } from "../../lib/client/split-in-half";
    import { H1 } from "../heading";
    import AboutImage from "./AboutImage.svelte";

    interface Props {
        title: string;
        aboutText: string;
        imgs: DirectusImageParams[];
        animationDelay: number;
    }

    const { title, aboutText, imgs, animationDelay: delay }: Props = $props();
    const [imgs1, imgs2] = $derived(splitInHalf(imgs));
</script>

<section
    class="
        relative -z-10 mx-auto grid grid-cols-1 gap-x-8 overflow-x-hidden
        md:grid-cols-[60%_1fr]
        lg:grid-cols-[57%_1fr]
    ">
    <article class={fadeIn()} style={animationDelay(delay)}>
        <H1 class="md:text-nowrap">{title}</H1>
        <div
            lang="de"
            class="
                text-justify hyphens-auto
                md:max-w-none
            ">
            {@html aboutText}
        </div>
    </article>
    <aside
        class="
            mx-auto mt-8 grid max-w-64 grid-flow-col grid-cols-2 gap-x-3 overflow-hidden
            *:w-full *:space-y-3
            sm:max-w-none sm:gap-x-12 sm:px-24 sm:*:space-y-12
            md:mt-0 md:gap-x-6 md:px-0 md:*:space-y-6
            lg:gap-x-8 lg:*:space-y-8
        ">
        <div
            class="
                pt-16
                sm:pt-24
                md:pt-32
                lg:pt-36
            ">
            {#each imgs1 as img, idx (idx)}
                <AboutImage {img} animationDelay={delay + 2 * idx + 1} />
            {/each}
        </div>
        <div>
            {#each imgs2 as img, idx (idx)}
                <AboutImage {img} animationDelay={delay + 2 * idx + 2} />
            {/each}
        </div>
    </aside>
</section>
