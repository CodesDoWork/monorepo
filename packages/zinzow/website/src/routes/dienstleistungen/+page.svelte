<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { splitInHalf } from "@cdw/monorepo/shared-utils/arrays";
    import { clsx } from "clsx";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ServiceCol } from "../../components/services";
    import { Paragraphs } from "../../components/text";
    import { fadeIn } from "../../lib/common/styles";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { intro, services, currentRoute, jsonldThings } = $derived(data);
    const [services1, services2] = $derived(splitInHalf(services));

    $effect(() => addJsonLdThings(jsonldThings));
</script>

<WidthBox class="isolate">
    <article class={clsx(fadeIn, "max-w-prose")}>
        <H1>{currentRoute?.name}</H1>
        <Paragraphs text={intro} />
    </article>
    <ul
        class="
            mt-8 grid grid-cols-1 gap-6
            md:mt-36 md:grid-cols-2
            lg:gap-12 lg:px-16
        ">
        <ServiceCol services={services1} col={1} cols={2} />
        <ServiceCol services={services2} col={2} cols={2} class="md:-mt-28" />
    </ul>
</WidthBox>
