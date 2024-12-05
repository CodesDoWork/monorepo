<script lang="ts">
    import type { PageData } from "../../../routes/service/$types";

    type Service = PageData["services"][number];

    export let services: Service[];
</script>

<div class="flex flex-col gap-6 lg:gap-10">
    {#each services as service}
        <a href={service.route.path}>
            <li
                class="group relative isolate rounded-xl shadow-md transition hover:scale-[102%] hover:shadow-lg">
                <img
                    class="absolute inset-0 -z-10 h-full w-full rounded-xl object-cover object-center"
                    alt={service.route.name}
                    src={service.thumbnail.route} />
                <div
                    class="rounded-xl px-8 py-12 transition group-hover:bg-white/75 dark:group-hover:bg-black/75">
                    <div class="-mt-9 pb-16 transition-all group-hover:mt-0 group-hover:pb-3">
                        <h2
                            class="w-fit text-pretty rounded-full bg-white/75 px-3 py-1 text-base font-semibold tracking-tight text-gray-900 transition-all group-hover:bg-transparent group-hover:text-3xl sm:group-hover:text-4xl dark:bg-black/75 dark:text-white">
                            {service.route.name}
                        </h2>
                    </div>
                    <p
                        class="mt-4 translate-y-4 text-center text-base opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
                        {service.shortDescription}
                    </p>
                </div>
            </li>
        </a>
    {/each}
</div>
