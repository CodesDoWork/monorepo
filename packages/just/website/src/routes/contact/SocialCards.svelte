<script lang="ts">
    import type { PageData } from "./$types";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import Icon from "@iconify/svelte";
    import { Card } from "../../components/card";
    import { H5, Link } from "../../components/texts";

    interface Props {
        socials: PageData["socials"];
    }

    const { socials }: Props = $props();
</script>

<div
    class="
        grid grid-cols-1 gap-4
        sm:grid-cols-2
    ">
    {#each socials as social, idx (idx)}
        <Card
            style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`}
            class="
                group border-l-4 border-(--hover-color) outline-0
                hover:border-l-8 hover:outline-0
            ">
            <Link
                isMe
                noStyle
                class="
                    grid w-full grid-cols-[auto_1fr] p-4 transition-all
                    hover:pt-3 hover:pb-5
                    sm:p-5 sm:hover:pb-7
                    md:h-20 md:p-6 md:hover:pt-4
                    lg:hover:pt-3
                "
                href={social.href}
                title={social.title}>
                <Icon
                    class="
                        row-span-2 mr-4 h-8 w-8 transition-colors
                        group-hover:text-(--hover-color)
                        sm:h-10 sm:w-10
                    "
                    icon={social.icon} />
                <H5
                    commandStyle={false}
                    class="
                        my-0! cursor-pointer text-black!
                        group-hover:text-(--hover-color)!
                        dark:text-white!
                    ">
                    {social.platform}
                </H5>
                <p
                    class="
                        text-0 h-0 text-slate-600 transition-[font-size]
                        sm:group-hover:text-sm
                        xl:group-hover:text-base
                        dark:text-slate-300
                    ">
                    {social.name}
                </p>
            </Link>
        </Card>
    {/each}
</div>
