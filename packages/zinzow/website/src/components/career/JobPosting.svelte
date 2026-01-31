<script lang="ts">
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { colorPrimaryClass, fadeInBottom } from "../../lib/common/styles";
    import { H3 } from "../heading";
    import { Icons } from "../icons";

    interface Props {
        title: string;
        description: string;
        files?: {
            url: string;
            title: string;
            filenameDownload: string;
        }[];
        animationDelay: number;
    }

    const { title, description, files, animationDelay: delay }: Props = $props();
</script>

<li
    style={animationDelay(delay)}
    class={clsx(
        fadeInBottom,
        `
            border-primary/20
            dark:border-primary/80
            rounded-lg border px-4 pb-4 shadow-xs
            sm:px-8 sm:pb-8
        `,
    )}>
    <H3>{title}</H3>
    <div lang="de" class="hyphens-auto">
        {@html description}
    </div>
    {#if files?.length}
        <ul class="mt-8">
            {#each files as file}
                <li>
                    <a
                        href={file.url}
                        download={file.filenameDownload}
                        class="
                            group flex items-center gap-2 rounded-md border border-gray-300
                            bg-white/30 p-2 shadow-2xs transition-all
                            hover:scale-[100.75%] hover:bg-white/50 hover:shadow-md
                            dark:border-gray-700 dark:bg-black/20
                            dark:hover:bg-black/40
                        ">
                        <Icon
                            icon={Icons.File}
                            class="
                                inline-block size-6 text-gray-600 transition-colors
                                group-hover:text-gray-900
                                dark:text-gray-400
                                dark:group-hover:text-gray-100
                            " />
                        <span
                            class={clsx(
                                colorPrimaryClass,
                                `
                                    group-hover:text-primary-700
                                    dark:group-hover:text-primary-300
                                    transition-colors
                                `,
                            )}>{file.title}</span>
                    </a>
                </li>
            {/each}
        </ul>
    {/if}
</li>
