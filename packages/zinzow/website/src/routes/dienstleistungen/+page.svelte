<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ServiceCol } from "../../components/services";
    import Paragraphs from "../../components/text/paragraphs.svelte";
    import { splitInHalf } from "../../lib/client/split-in-half";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { services, currentRoute, texts } = $derived(data);
    const [services1, services2] = $derived(splitInHalf(services));
</script>

<WidthBox class="isolate">
    <H1>{currentRoute?.name}</H1>
    <Paragraphs class="max-w-prose" text={texts.intro} />
    <ol
        class="
            mt-16 grid grid-cols-1 gap-6
            md:grid-cols-2
            lg:gap-12 lg:px-16
        ">
        <ServiceCol services={services1} />
        <ServiceCol services={services2} class="md:-mt-28" />
    </ol>
</WidthBox>
