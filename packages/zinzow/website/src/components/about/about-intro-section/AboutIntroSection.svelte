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

<section
    class="
        relative -z-10 mx-auto grid grid-cols-1 overflow-x-hidden
        md:grid-cols-[60%_40%] md:px-8
        lg:grid-cols-[57%_43%] lg:px-0
    ">
    <article>
        <H1>{title}</H1>
        <div
            lang="de"
            class="
                mt-8 space-y-4 text-justify text-lg font-medium text-pretty hyphens-auto
                text-gray-600
                sm:text-xl/8
                md:max-w-none md:pr-12
                lg:pr-12
                dark:text-gray-400
            ">
            {@html aboutText}
        </div>
    </article>
    <aside
        class="
            mx-auto mt-8 grid max-w-64 grid-flow-col grid-cols-2 gap-x-3
            *:w-full *:space-y-3
            md:mt-0 md:max-w-none md:gap-x-8 md:*:space-y-8
        ">
        <div
            class="
                pt-8
                sm:pt-24
                md:pt-32
                lg:pt-36
            ">
            {#each imgs1 as img}
                <AboutImage {img} />
            {/each}
        </div>
        <div>
            {#each imgs2 as img}
                <AboutImage {img} />
            {/each}
        </div>
    </aside>
</section>
