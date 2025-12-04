<script lang="ts">
    import type { DirectusImageParams } from "../../../lib/common/directus-image";
    import { H1 } from "../../heading";
    import { AboutImage } from "../about-image";

    interface Props {
        title: string;
        aboutText: string;
        imgs: DirectusImageParams[];
    }

    const { title, aboutText, imgs }: Props = $props();
    const imgs1 = imgs.slice(0, imgs.length / 2);
    const imgs2 = imgs.slice(imgs.length / 2, imgs.length);
</script>

<div
    class="
        relative -z-10 mx-auto grid max-w-2xl grid-cols-1 gap-x-14 overflow-x-hidden
        md:max-w-none md:grid-cols-[1fr_min-content]
    ">
    <div
        class="
            relative w-full
            lg:max-w-xl lg:shrink-0
            xl:max-w-2xl
        ">
        <H1>{title}</H1>
        <div
            class="
                mt-8 space-y-4 text-lg font-medium text-pretty text-gray-600
                sm:max-w-md sm:text-xl/8
                md:text-justify
                lg:max-w-none
                dark:text-gray-400
            ">
            {@html aboutText}
        </div>
    </div>
    <div
        class="
            mx-auto mt-8 mr-8 flex w-fit justify-end gap-x-3
            sm:-mt-44 sm:justify-start sm:pl-20
            md:mt-14 md:gap-x-8
            lg:mt-0 lg:pl-0
        ">
        <div
            class="
                ml-auto w-32 flex-none space-y-3 pt-8
                sm:ml-0 sm:pt-80
                md:w-56 md:space-y-8 md:pt-32
                lg:pt-36
            ">
            {#each imgs1 as img}
                <AboutImage {img} />
            {/each}
        </div>
        <div
            class="
                mr-auto w-32 flex-none space-y-3
                sm:mr-0
                md:w-56 md:space-y-8
                lg:pt-0
            ">
            {#each imgs2 as img}
                <AboutImage {img} />
            {/each}
        </div>
    </div>
</div>
