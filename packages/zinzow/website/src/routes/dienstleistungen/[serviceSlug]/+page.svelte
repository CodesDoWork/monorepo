<script lang="ts">
    import type { PageData } from "./$types";
    import AboutImage from "../../../components/about/AboutImage.svelte";
    import { WidthBox } from "../../../components/content-area";
    import { H1 } from "../../../components/heading";
    import { getNavigationContext } from "../../../contexts/navigation";
    import { splitInHalf } from "../../../lib/client/split-in-half";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { description, images } = $derived(data);
    const nav = getNavigationContext();

    const [imgs1, imgs2] = $derived(splitInHalf(images));
</script>

<WidthBox class="isolate">
    <H1>{nav.currentRoute?.name}</H1>
    <section class="grid grid-cols-[57%_1fr] gap-8">
        <article>
            {@html description}
        </article>
        <aside
            class="
                grid grid-cols-2 gap-x-8
                *:space-y-8
            ">
            <ul
                class="
                    pt-8
                    sm:pt-24
                    md:pt-32
                    lg:pt-16
                ">
                {#each imgs1 as img}
                    <li>
                        <AboutImage {img} class="aspect-4/5!" />
                    </li>
                {/each}
            </ul>
            <ul class="">
                {#each imgs2 as img}
                    <li>
                        <AboutImage {img} class="aspect-4/5!" />
                    </li>
                {/each}
            </ul>
        </aside>
    </section>
</WidthBox>
