<script lang="ts">
    import type { PageData } from "./$types";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ServiceCol } from "../../components/services";
    import { Paragraphs } from "../../components/text";
    import { splitInHalf } from "../../lib/client/split-in-half";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { services, currentRoute, texts } = $derived(data);
    const [services1, services2] = $derived(splitInHalf(services));
</script>

<WidthBox class="isolate">
    <article class="max-w-prose">
        <H1>{currentRoute?.name}</H1>
        <Paragraphs text={texts.intro} />
    </article>
    <ol
        class="
            mt-8 grid grid-cols-1 gap-6
            md:mt-36 md:grid-cols-2
            lg:gap-12 lg:px-16
        ">
        <ServiceCol services={services1} />
        <ServiceCol services={services2} class="md:-mt-28" />
    </ol>
</WidthBox>
