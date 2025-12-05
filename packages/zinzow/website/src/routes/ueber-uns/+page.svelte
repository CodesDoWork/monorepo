<script lang="ts">
    import type { PageData } from "./$types";
    import { AboutIntroSection } from "../../components/about/about-intro-section";
    import { AboutMissionSection } from "../../components/about/about-mission-section";
    import { AboutPartnersSection } from "../../components/about/about-partners-section";
    import { AboutStats } from "../../components/about/about-stats";
    import { AboutValuesSection } from "../../components/about/about-values-section";
    import { PageContent } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H2, H4 } from "../../components/heading";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { texts, about, stats, values } = data;
</script>

<PageContent class="isolate">
    <AboutStats {stats} />
    <AboutIntroSection title={about.title} aboutText={about.aboutText} imgs={about.images} />
    <AboutMissionSection title={texts.ourMission} text={about.missionText} />

    <div
        class="
            mx-auto mt-16
            sm:mt-24
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

    <!-- Team section -->
    <div
        class="
            mx-auto mt-32 max-w-7xl px-6
            sm:mt-48
            lg:px-8
        ">
        <div
            class="
                mx-auto max-w-2xl
                lg:mx-0
            ">
            <H2>{texts.ourTeam}</H2>
            <p class="mt-6 text-lg/8 text-gray-600">
                {about.teamText}
            </p>
        </div>
        <ul
            role="list"
            class="
                mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center
                sm:grid-cols-3
                md:grid-cols-4
                lg:mx-0 lg:max-w-none lg:grid-cols-5
                xl:grid-cols-6
            ">
            <li>
                <img
                    class="mx-auto size-24 rounded-full"
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"
                    alt="" />
                <H4 class="mt-6">Michael Foster</H4>
                <p class="text-sm/6 text-gray-600">Co-Founder / CTO</p>
            </li>

            <!-- More people... -->
        </ul>
    </div>
</PageContent>
