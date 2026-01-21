<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { splitInHalf } from "@cdw/monorepo/shared-utils/arrays";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { WidthBox } from "../../../components/content-area";
    import { H1 } from "../../../components/heading";
    import { ServiceImage } from "../../../components/services";
    import { fadeIn } from "../../../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { description, currentRoute, images, jsonldThings } = $derived(data);

    const [imgs1, imgs2] = $derived(splitInHalf(images));

    $effect(() => addJsonLdThings(jsonldThings));
</script>

<WidthBox class="isolate">
    {#key currentRoute?.name}
        <H1 class={fadeIn}>{currentRoute?.name}</H1>
        <section
            class="
                grid gap-12
                md:grid-cols-[50%_1fr]
                lg:gap-16
            ">
            <article class={fadeIn} style={animationDelay(1)}>
                {@html description}
            </article>
            <aside
                class="
                    grid gap-4 px-4
                    *:space-y-4
                    sm:grid-cols-2
                    md:px-0
                    lg:gap-x-8
                    lg:*:space-y-8
                ">
                <ul
                    class="
                        pt-8
                        sm:pt-24
                    ">
                    {#each imgs1 as img, idx (idx)}
                        {#key img.src}
                            <li>
                                <ServiceImage {img} animationDelay={2 * idx + 1} />
                            </li>
                        {/key}
                    {/each}
                </ul>
                <ul class="">
                    {#each imgs2 as img, idx (idx)}
                        {#key img.src}
                            <li>
                                <ServiceImage {img} animationDelay={2 * idx + 2} />
                            </li>
                        {/key}
                    {/each}
                </ul>
            </aside>
        </section>
    {/key}
</WidthBox>
