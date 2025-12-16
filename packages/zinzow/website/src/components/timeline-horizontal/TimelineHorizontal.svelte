<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { P } from "../text";

    interface Props {
        timesteps: {
            date: string;
            description: string;
        }[];
    }

    const { timesteps }: Props = $props();
</script>

<div class="relative mt-24 w-full">
    <div
        class="
            absolute left-2/5 h-full w-1.5 -translate-x-1/2 rounded-full bg-(--primary)
            md:top-1/2 md:right-2 md:left-auto md:h-1.5 md:w-full md:translate-x-0
            md:-translate-y-1/2
        ">
    </div>
    <div
        class="
            absolute bottom-0 left-2/5 size-6 -translate-x-1/2 translate-y-1/2 text-(--primary)
            *:size-full
            md:top-1/2 md:right-0 md:bottom-auto md:left-auto md:translate-x-[37%]
            md:-translate-y-1/2
        ">
        <Icon
            icon="bxs:right-arrow"
            class="
                hidden
                md:block
            " />
        <Icon
            icon="bxs:down-arrow"
            class="
                block
                md:hidden
            " />
    </div>
    <ul
        class="
            flex flex-col justify-between gap-6
            md:flex-row md:gap-4
        ">
        {#each timesteps as step, idx (idx)}
            <li
                class={clsx(
                    `
                        group relative cursor-default
                        md:min-w-28
                    `,
                    {
                        "mt-4 md:mt-0": idx === 0,
                        "mb-8 md:mr-2 md:mb-0": idx === timesteps.length - 1,
                    },
                )}>
                <div
                    class="
                        absolute top-1/2 left-2/5 h-1 w-16 -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-(--primary) transition-all
                        md:left-1/2 md:h-16 md:w-1 md:group-hover:h-20
                    ">
                </div>
                <div
                    class="
                        absolute top-1/2 left-2/5 size-3 -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-(--primary)
                        md:left-1/2
                    ">
                </div>
                <div
                    class="
                        grid h-full grid-cols-[auto_2.25rem_60%] items-center
                        *:transition-all *:group-hover:text-black
                        md:grid-cols-1 md:grid-rows-[auto_2.25rem_50%] md:items-start
                        md:*:text-center
                        dark:*:group-hover:text-white
                    ">
                    <P
                        class="
                            mb-0! pr-1 text-right text-sm
                            md:self-end md:pt-2 md:pr-0 md:pb-0 md:group-hover:pt-0
                            md:group-hover:pb-2
                        ">{step.date}</P>
                    <P
                        lang="de"
                        class="
                            col-start-3 pl-10 text-left hyphens-auto
                            md:col-start-1 md:row-start-3 md:pt-8 md:pb-2 md:pl-0
                            md:group-hover:pt-10 md:group-hover:pb-0
                        ">{step.description}</P>
                </div>
            </li>
        {/each}
    </ul>
</div>
