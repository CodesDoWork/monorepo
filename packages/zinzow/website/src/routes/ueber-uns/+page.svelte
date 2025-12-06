<script lang="ts">
    import type { PageData } from "./$types";
    import {
        AboutIntroSection,
        AboutMissionSection,
        AboutPartnersSection,
        AboutStats,
        AboutTeamSection,
        AboutValuesSection,
    } from "../../components/about";
    import { PageContent } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { texts, about, stats, values, teamMembers } = data;
</script>

<PageContent class="isolate">
    <AboutStats {stats} />
    <AboutIntroSection title={about.title} aboutText={about.aboutText} imgs={about.images} />
    <AboutMissionSection title={texts.ourMission} text={about.missionText} />

    <div
        class="
            mx-auto mt-16
            sm:mt-24
            md:px-16
            lg:px-8
        ">
        <DirectusImage
            img={about.bannerImage}
            class="
                aspect-5/2 w-full rounded-lg shadow-md
                md:rounded-2xl
                xl:rounded-3xl
            " />
    </div>

    <AboutValuesSection title={texts.ourValues} text={about.valuesText} {values} />
    <AboutPartnersSection title={about.partnersTitle} partners={about.partners} />

    {#if about.isTeamVisible}
        <AboutTeamSection title={about.teamTitle} text={about.teamText} members={teamMembers} />
    {/if}
</PageContent>
