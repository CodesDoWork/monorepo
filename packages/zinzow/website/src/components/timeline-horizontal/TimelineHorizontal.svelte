<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { P } from "../text";

    interface Props {
        timesteps: {
            date: string;
            description: string;
        }[];
        class?: string;
    }

    const { timesteps, class: className }: Props = $props();

    const spacingBlockClass = clsx(`
        relative col-start-2 block h-2
        md:col-start-auto md:row-start-2 md:h-auto md:w-2
    `);
    const verticalLineClass = clsx(`
        absolute top-0 left-1/2 h-[101%] w-1.5 -translate-x-1/2 bg-(--primary)
        md:top-1/2 md:left-0 md:h-1.5 md:w-[101%] md:translate-x-0 md:-translate-y-1/2
    `);
</script>

<ul
    class={clsx(
        className,
        `
            relative mx-auto grid w-fit grid-cols-[min-content_4.5rem_minmax(0,1fr)] gap-x-2 px-8
            md:grid-flow-col md:grid-cols-none md:grid-rows-[min-content_4.5rem_minmax(0,1fr)]
            md:gap-x-0 md:px-0
        `,
    )}>
    <div class={spacingBlockClass}>
        <div
            class={clsx(
                verticalLineClass,
                `
                    rounded-t-full
                    md:rounded-t-none md:rounded-l-full
                `,
            )}>
        </div>
    </div>
    {#each timesteps as step, idx (idx)}
        <li
            class="
                group relative col-span-3 grid cursor-default grid-cols-subgrid items-stretch
                md:col-span-1 md:row-span-3 md:grid-cols-1 md:grid-rows-subgrid
            ">
            <P
                class="
                    self-center text-right text-sm
                    group-hover:pt-0 group-hover:pb-2 group-hover:text-gray-950
                    md:self-end md:pt-2 md:text-center md:transition-all
                    md:dark:group-hover:text-gray-50
                ">{step.date}</P>
            <div
                class="
                    relative mx-1 transition-all
                    group-hover:-my-1.5
                    md:mx-0 md:my-0.5
                ">
                <div class={verticalLineClass}></div>
                <div
                    class="
                        absolute top-1/2 left-0 h-1 w-full -translate-y-1/2 rounded-full
                        bg-(--primary)
                        md:top-0 md:left-1/2 md:h-full md:w-1 md:-translate-x-1/2 md:translate-y-0
                    ">
                </div>
                <div
                    class="
                        absolute top-1/2 left-1/2 size-3 -translate-x-1/2 -translate-y-1/2
                        rounded-full bg-(--primary)
                    ">
                </div>
            </div>
            <P
                lang="de"
                class="
                    my-2 self-center
                    group-hover:pt-2 group-hover:pb-0 group-hover:text-gray-950
                    md:mx-2 md:my-0 md:self-start md:pb-2 md:text-center md:hyphens-auto
                    md:transition-all
                    lg:mx-4
                    md:dark:group-hover:text-gray-50
                ">{step.description}</P>
        </li>
    {/each}
    <div class={spacingBlockClass}>
        <div class={verticalLineClass}></div>
    </div>
    <div
        class="
            col-start-2 -mt-4 block size-8 place-self-center self-center text-(--primary)
            *:size-8
            md:col-start-auto md:row-start-2 md:mt-0 md:-ml-4
        ">
        <Icon icon="eva:arrow-down-fill" class="md:hidden" />
        <Icon
            icon="eva:arrow-right-fill"
            class="
                hidden
                md:block
            " />
    </div>
</ul>
