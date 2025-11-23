<script lang="ts">
    import type { PageData } from "../../routes/dienstleistungen/$types";
    import { H2 } from "../heading";

    type Service = PageData["services"][number];

    interface Props {
        services: Service[];
    }

    const { services }: Props = $props();
</script>

<div
    class="
    flex flex-col gap-6
    lg:gap-10
">
    {#each services as service}
        <a href={service.route.path}>
            <li
                class="
                    group relative isolate rounded-xl shadow-md transition
                    hover:scale-[102%] hover:shadow-lg
                ">
                <img
                    class="
                        absolute inset-0 -z-10 h-full w-full rounded-xl
                        object-cover object-center
                    "
                    alt={service.route.name}
                    src={service.thumbnail.url} />
                <div
                    class="
                      relative rounded-xl px-4 py-16 transition
                      group-hover:bg-white/75 group-hover:py-18
                      dark:group-hover:bg-black/75
                    ">
                    <H2
                        class="
                          absolute top-2 left-3 w-fit rounded-full bg-white/75
                          px-3 py-1 text-sm text-nowrap transition-all
                          group-hover:top-12 group-hover:right-1/2
                          group-hover:left-1/2 group-hover:-translate-x-1/2
                          group-hover:bg-transparent group-hover:text-3xl
                          sm:text-base sm:group-hover:text-4xl
                          dark:bg-black/75 dark:text-(--primary-100)
                        ">
                        {service.route.name}
                    </H2>
                    <p
                        class="
                            mx-2 mt-12 translate-y-4 text-center text-base
                            opacity-0 transition
                            group-hover:translate-y-0 group-hover:opacity-100
                        ">
                        {service.shortDescription}
                    </p>
                </div>
            </li>
        </a>
    {/each}
</div>
