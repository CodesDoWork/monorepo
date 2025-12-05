<script lang="ts">
    import type { DirectusImageParams } from "../../../lib/common/directus-image";
    import { BackgroundGrid } from "../../background-grid";
    import { DirectusImage } from "../../directus-image";
    import { H4 } from "../../heading";

    interface Props {
        title: string;
        partners: DirectusImageParams[];
    }

    const { title, partners }: Props = $props();
</script>

<section
    class="
        relative isolate -z-10 mt-32 mb-64
        sm:mt-48
    ">
    <BackgroundGrid />
    <article
        class="
            mx-auto max-w-7xl px-6
            lg:px-8
        ">
        <H4 class="text-center">
            {title}
        </H4>
        <div
            class="
                mx-auto mt-10 flex max-w-lg flex-col place-items-center items-center justify-around
                gap-x-8 gap-y-16
                sm:max-w-xl sm:gap-x-10
                md:flex-row md:flex-wrap
                lg:mx-0 lg:max-w-none
            ">
            {#each partners as partner}
                <DirectusImage img={partner} class="max-h-16" />
            {/each}
        </div>
    </article>
</section>
