<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import Card from "../../components/Card.svelte";
    import Heading from "../../components/Heading.svelte";
    import Link from "../../components/Link.svelte";
    import { animationDelay } from "../../shared/animationDelay";

    interface Props {
        socials: PageData["socials"];
    }

    const { socials }: Props = $props();
</script>

<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
    {#each socials as social, idx (idx)}
        <Card
            style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`}
            class="group border-l-4 border-[var(--hover-color)] outline-0 hover:border-l-8 hover:outline-0">
            <Link
                isMe
                noStyle
                class="grid w-full grid-cols-[auto_1fr] p-4 transition-all hover:pb-5 hover:pt-3 sm:p-5 sm:hover:pb-7 md:h-20 md:p-6 md:hover:pt-4 lg:hover:pt-3"
                href={social.href}
                title={social.title}>
                <Icon
                    class="row-span-2 mr-4 h-8 w-8 transition-colors group-hover:text-[var(--hover-color)] sm:h-10 sm:w-10"
                    icon={social.icon} />
                <Heading
                    commandStyle={false}
                    class="!mb-0 cursor-pointer !text-black group-hover:!text-[var(--hover-color)] dark:!text-white"
                    level="h5">{social.platform}</Heading>
                <p
                    class="text-0 transition-fontSize h-0 text-slate-600 sm:group-hover:text-sm xl:group-hover:text-base dark:text-slate-300">
                    {social.name}
                </p>
            </Link>
        </Card>
    {/each}
</div>
