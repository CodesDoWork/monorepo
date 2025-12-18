<script lang="ts">
    import type { PageData } from "../../routes/dienstleistungen/$types";
    import { clsx } from "clsx";
    import DirectusImage from "../directus-image/DirectusImage.svelte";
    import { H2 } from "../heading";

    type Service = PageData["services"][number];

    interface Props {
        services: Service[];
        class?: string;
    }

    const { services, class: className }: Props = $props();
</script>

<div
    class={clsx(
        className,
        `
            flex flex-col gap-6
            lg:gap-12
        `,
    )}>
    {#each services as service}
        <a href={service.route.path}>
            <li
                class="
                    group relative isolate rounded-xl shadow-md transition
                    hover:scale-[102%] hover:shadow-lg
                ">
                <DirectusImage
                    class="absolute! inset-0 -z-10 size-full"
                    imgClass="rounded-xl"
                    img={service.thumbnail} />
                <div
                    class="
                        relative rounded-xl py-40 transition
                        group-hover:bg-white/75
                        lg:py-48
                        dark:group-hover:bg-black/75
                    ">
                    <H2
                        class="
                            dark:text-primary-100 dark:bg-black/75
                            absolute top-2 left-2 mt-0! size-fit rounded-lg bg-white/75 px-3 py-1
                            text-sm! text-nowrap transition-all
                            group-hover:top-1/2 group-hover:right-1/2 group-hover:bottom-1/2
                            group-hover:left-1/2 group-hover:-translate-x-1/2
                            group-hover:-translate-y-1/2 group-hover:bg-transparent
                            group-hover:text-3xl!
                            sm:text-base! sm:group-hover:text-4xl!
                        ">
                        {service.route.name}
                    </H2>
                </div>
            </li>
        </a>
    {/each}
</div>
