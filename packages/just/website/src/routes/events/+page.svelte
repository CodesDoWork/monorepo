<script lang="ts">
    import type { PageData } from "./$types";
    import { goto } from "$app/navigation";
    import TechnologiesList from "../../components/TechnologiesList.svelte";
    import TimeLine from "../../components/TimeLine.svelte";
    import { smoothScrollTo } from "../../shared/smoothScroll";
    import { ProjectsList } from "../../components/projects-list";
    import Description from "../../components/Description.svelte";
    import LinksList from "../../components/LinksList.svelte";
    import ListWithHeading from "../../components/ListWithHeading.svelte";
    import { blur } from "svelte/transition";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { events, currentLanguage, projectRoute } = data;

    const formatter = new Intl.DateTimeFormat(currentLanguage.code);

    function gotoProject(project: (typeof events)[number]["projects"][number]) {
        goto(projectRoute.route).then(() =>
            setTimeout(() => smoothScrollTo(`#_${project.id}`), 900),
        );
    }

    let clickedImage = $state("");
</script>

{#if clickedImage}
    <dialog
        transition:blur={{ duration: 200 }}
        open
        class="fixed inset-0 z-50 h-screen w-screen bg-black/75"
        onmouseup={() => (clickedImage = "")}>
        <div
            id="image-container"
            class="absolute left-1/2 top-1/2 max-h-[80vh] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
            style="width: 80vw; height: 80vh;">
            <img
                alt=""
                src={clickedImage}
                class="m-auto max-h-full max-w-full rounded-lg object-contain shadow-lg" />
        </div>
    </dialog>
{/if}

<TimeLine steps={events} logo={event => event.logo}>
    {#snippet date(event)}
        {formatter.formatRange(event.startDate, event.endDate)}
    {/snippet}
    {#snippet title(event)}
        {event.title}
    {/snippet}
    {#snippet content(event)}
        <Description>{event.description}</Description>
        <div class="flex gap-12">
            <ProjectsList text="Projects:" projects={event.projects} onclick={gotoProject} />
            <LinksList text="Links:" links={event.links} />
            <ListWithHeading text="Images:" items={event.images}>
                {#snippet display(img)}
                    <button onclick={() => (clickedImage = img)}>
                        <img
                            src={img}
                            alt=""
                            class="w-40 rounded-lg object-cover shadow-lg hover:scale-[102%] hover:shadow-xl transition" />
                    </button>
                {/snippet}
            </ListWithHeading>
        </div>
        <TechnologiesList text="Technologies:" technologies={event.technologies} />
    {/snippet}
</TimeLine>
