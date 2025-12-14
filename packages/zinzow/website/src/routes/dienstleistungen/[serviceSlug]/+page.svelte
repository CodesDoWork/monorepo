<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../../components/content-area";
    import { H1 } from "../../../components/heading";
    import { ServiceImage } from "../../../components/services";
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
    <section
        class="
            grid gap-12
            md:grid-cols-[50%_1fr]
            lg:gap-16
        ">
        <article>
            {@html description}
        </article>
        <aside
            class="
                grid gap-4 px-4
                *:space-y-4
                sm:grid-cols-2
                md:px-0
                lg:gap-x-8 lg:*:space-y-8
            ">
            <ul
                class="
                    pt-8
                    sm:pt-24
                ">
                {#each imgs1 as img}
                    <li>
                        <ServiceImage {img} />
                    </li>
                {/each}
            </ul>
            <ul class="">
                {#each imgs2 as img}
                    <li>
                        <ServiceImage {img} />
                    </li>
                {/each}
            </ul>
        </aside>
    </section>
</WidthBox>
