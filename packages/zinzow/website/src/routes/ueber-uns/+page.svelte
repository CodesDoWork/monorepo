<script lang="ts">
    import type { PageData } from "./$types";
    import {
        AboutIntroSection,
        AboutMissionSection,
        AboutStats,
        AboutTeamSection,
        AboutValuesSection,
    } from "../../components/about";
    import { WidthBox } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { TimelineHorizontal } from "../../components/timeline-horizontal";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { texts, about, stats, timesteps, values, teamMembers } = $derived(data);
</script>

<WidthBox
    class="
        isolate space-y-16
        sm:space-y-24
    ">
    <AboutStats {stats} />
    <AboutIntroSection title={about.title} aboutText={about.aboutText} imgs={about.images} />
    <TimelineHorizontal {timesteps} />
    <AboutMissionSection title={texts.ourMission} text={about.missionText} />

    <div
        class="
            mx-auto
            md:px-16
            lg:px-8
        ">
        <DirectusImage
            img={about.bannerImage}
            imgClass="rounded-lg shadow-md md:rounded-2xl xl:rounded-3xl"
            class="aspect-5/2 w-full" />
    </div>

    <AboutValuesSection title={texts.ourValues} text={about.valuesText} {values} />
    {#if teamMembers}
        <AboutTeamSection title={about.teamTitle} text={about.teamText} members={teamMembers} />
    {/if}
</WidthBox>
