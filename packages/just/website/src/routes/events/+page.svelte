<script lang="ts">
    import type { PageData } from "./$types";
    import DirectusImage from "@cdw/monorepo/packages/shared/svelte/components/src/directus-image/DirectusImage.svelte";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { clsx } from "clsx";
    import {
        LinksList,
        ListWithHeading,
        ProjectsList,
        TechnologiesList,
    } from "../../components/lists";
    import { Description } from "../../components/texts";
    import { TimeLine } from "../../components/timeline";
    import { getOverlayContext } from "../../contexts/overlay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { events, currentLanguage, texts, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    const overlayContext = getOverlayContext();

    const formatter = $derived(new Intl.DateTimeFormat(currentLanguage.code));
</script>

<TimeLine steps={events} logo={event => event.logo}>
    {#snippet date(event)}
        {formatter.formatRange(event.startDate, event.endDate)} ({event.location})
    {/snippet}
    {#snippet title(event)}
        {event.title}
    {/snippet}
    {#snippet content(event)}
        <Description lang={currentLanguage.short}>{event.description}</Description>
        <div class="flex flex-wrap gap-x-12">
            <ProjectsList
                text={`${texts.projects}: `}
                projects={event.projects}
                href={p => p.href} />
            <LinksList text={`${texts.links}: `} links={event.links} />
            <TechnologiesList text={`${texts.technologies}: `} technologies={event.technologies} />
            <ListWithHeading text={`${texts.images}: `} items={event.images} listClass="gap-4">
                {#snippet display(img)}
                    <button onclick={() => (overlayContext.img = img)} class="cursor-pointer">
                        <DirectusImage
                            {img}
                            imgClass={clsx("rounded-lg")}
                            class="
                                size-28 rounded-lg shadow-lg transition
                                hover:scale-102 hover:shadow-xl
                            " />
                    </button>
                {/snippet}
            </ListWithHeading>
        </div>
    {/snippet}
</TimeLine>
