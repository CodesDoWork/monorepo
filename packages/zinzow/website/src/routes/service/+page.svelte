<script lang="ts">
    import { ContentArea } from "../../components/content-area";
    import { ServiceCol } from "../../components/services/col";
    import type { PageData } from "./$types";

    export let data: PageData;
    const { services, currentRoute } = data;
    const services1 = services.slice(0, services.length / 2);
    const services2 = services.slice(services.length / 2, services.length);
</script>

<ContentArea>
    <div class="py-16 lg:py-24">
        <h1
            class="text-pretty text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl dark:text-white">
            {$currentRoute.name}
        </h1>
        <p class="mt-6 max-w-prose text-lg/8 text-gray-600 dark:text-gray-300">
            {$currentRoute.welcomeText}
        </p>
        <ol class="mt-10 grid grid-cols-1 gap-6 px-8 md:grid-cols-2 lg:gap-10">
            <ServiceCol services={services1} />
            <ServiceCol services={services2} />
        </ol>
    </div>
</ContentArea>
