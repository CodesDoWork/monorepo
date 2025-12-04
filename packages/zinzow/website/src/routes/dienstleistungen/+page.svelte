<script lang="ts">
    import type { PageData } from "./$types";
    import PageContent from "../../components/content-area/page-content.svelte";
    import { H1 } from "../../components/heading";
    import { ServiceCol } from "../../components/services";
    import Paragraphs from "../../components/text/paragraphs.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { services, currentRoute, texts } = data;
    const services1 = services.slice(0, services.length / 2);
    const services2 = services.slice(services.length / 2, services.length);
</script>

<PageContent class="isolate">
    <H1>{currentRoute?.name}</H1>
    <Paragraphs class="max-w-prose" text={texts.intro} />
    <ol
        class="
            mt-16 grid grid-cols-1 gap-6
            md:grid-cols-2
            lg:gap-12 lg:px-16
        ">
        <ServiceCol services={services1} />
        <ServiceCol services={services2} class="md:-mt-24" />
    </ol>
</PageContent>
