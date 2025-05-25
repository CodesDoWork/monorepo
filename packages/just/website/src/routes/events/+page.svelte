<script lang="ts">
    import type { PageData } from "./$types";
    import Description from "../../components/Description.svelte";
    import LinksList from "../../components/LinksList.svelte";
    import ListWithHeading from "../../components/ListWithHeading.svelte";
    import { ProjectsList } from "../../components/projects-list";
    import TechnologiesList from "../../components/TechnologiesList.svelte";
    import TimeLine from "../../components/TimeLine.svelte";
    import { addJsonLdThings } from "../../contexts/jsonld";
    import { getOverlayContext } from "../../contexts/overlay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { events, currentLanguage, texts, jsonLdThings } = data;
    addJsonLdThings(jsonLdThings);

    const overlayContext = getOverlayContext();

    const formatter = new Intl.DateTimeFormat(currentLanguage.code);
</script>

<TimeLine steps={events} logo={event => event.logo}>
    {#snippet date(event)}
        {formatter.formatRange(event.startDate, event.endDate)} ({event.location})
    {/snippet}
    {#snippet title(event)}
        {event.title}
    {/snippet}
    {#snippet content(event)}
        <Description>{event.description}</Description>
        <div class="flex gap-x-12 flex-wrap">
            <ProjectsList
                text={`${texts.projects}: `}
                projects={event.projects}
                href={p => p.href} />
            <LinksList text={`${texts.links}: `} links={event.links} />
            <TechnologiesList text={`${texts.technologies}: `} technologies={event.technologies} />
            <ListWithHeading text={`${texts.images}: `} items={event.images} listClass="gap-4">
                {#snippet display(img)}
                    <button onclick={() => (overlayContext.img = img)}>
                        <img
                            loading="lazy"
                            src={img}
                            alt=""
                            class="size-28 rounded-lg aspect-square object-cover shadow-lg hover:scale-[102%] hover:shadow-xl transition" />
                    </button>
                {/snippet}
            </ListWithHeading>
        </div>
    {/snippet}
</TimeLine>
