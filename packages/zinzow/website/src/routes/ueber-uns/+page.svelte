<script lang="ts">
    import type { PageData } from "./$types";
    import { clsx } from "clsx";
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
    import { animationDelay, fadeInBottom } from "../../lib/client/animate";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { about, stats, timesteps, values, teamMembers } = $derived(data);
</script>

<WidthBox
    class="
        isolate space-y-16
        sm:space-y-24
    ">
    <AboutStats {stats} animationDelay={0} />
    <AboutIntroSection
        title={about.title}
        aboutText={about.aboutText}
        imgs={about.images}
        animationDelay={2} />
    <TimelineHorizontal {timesteps} animationDelay={4} />
    <AboutMissionSection title={about.ourMission} text={about.missionText} animationDelay={5} />

    <div
        style={animationDelay(6)}
        class={clsx(
            fadeInBottom(),
            `
                mx-auto
                md:px-16
                lg:px-8
            `,
        )}>
        <DirectusImage
            img={about.bannerImage}
            imgClass="rounded-lg shadow-md md:rounded-2xl xl:rounded-3xl"
            class="aspect-5/2 w-full" />
    </div>

    <AboutValuesSection
        title={about.ourValues}
        text={about.valuesText}
        {values}
        animationDelay={7} />
    {#if teamMembers.length}
        <AboutTeamSection
            title={about.teamTitle}
            text={about.teamText}
            members={teamMembers}
            animationDelay={9} />
    {/if}
</WidthBox>
