<script lang="ts">
    import type { PageData } from "./$types";
    import PageContent from "../../components/content-area/page-content.svelte";
    import { H1 } from "../../components/heading";
    import { ServiceCol } from "../../components/services/col";

    export let data: PageData;
    const { services, currentRoute } = data;
    const services1 = services.slice(0, services.length / 2);
    const services2 = services.slice(services.length / 2, services.length);
</script>

<PageContent class="isolate">
    <H1>{$currentRoute.name}</H1>
    <p class="mt-6 max-w-prose text-lg/8 text-gray-600 dark:text-gray-300">
        {$currentRoute.welcomeText}
    </p>
    <ol class="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10">
        <ServiceCol services={services1} />
        <ServiceCol services={services2} />
    </ol>
</PageContent>
