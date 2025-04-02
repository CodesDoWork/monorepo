<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../components/Card.svelte";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import { animationDelay } from "../shared/animationDelay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { routes, socials } = data;

    const homePageLinks = routes.filter(r => r.route !== "/");
    const findRouteColor = (route: string) => {
        return routes?.find(r => r.route === route)?.color || "var(--accent)";
    };

    const headingClass = clsx(
        "m-5 md:m-6",
        "group-hover:mb-6 group-hover:mt-3 sm:group-hover:mb-8 sm:group-hover:mt-2 md:group-hover:mt-4 lg:group-hover:mt-3",
        "!mb-0 cursor-pointer group-hover:!text-[var(--hover-color)] dark:!text-white",
        "!transition-all",
    );
</script>

<div class="mb-12 flex justify-center gap-3 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
    {#each socials as social, idx (idx)}
        <Link
            href={social.href}
            title={social.title}
            noStyle
            class="transition-transform hover:scale-110 size-7 md:size-9">
            <Icon
                class="animate-fadeInSubtle w-full h-full opacity-0 drop-shadow transition hover:text-[var(--hover-color)]"
                icon={social.icon}
                style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`} />
        </Link>
    {/each}
</div>
<div
    class="mx-auto flex w-4/5 flex-col gap-4 sm:w-3/4 md:grid md:w-11/12 md:grid-cols-2 lg:w-full xl:w-3/4">
    {#each homePageLinks as navLink, idx (idx)}
        <Card
            style={`--hover-color: ${findRouteColor(navLink.route)}; ${animationDelay(idx)}`}
            safeBg
            class="!hover:outline-0 group flex h-16 border-l-4 border-[var(--hover-color)] !outline-0 hover:border-l-8 md:h-20">
            <Link
                title={navLink.name}
                noStyle
                class="flex h-full w-full flex-col"
                href={navLink.route}>
                <Heading class={headingClass} level="h3">{navLink.name}</Heading>
                <p
                    class="text-0 transition-fontSize ml-4 h-0 text-slate-600 sm:ml-5 sm:group-hover:text-sm md:ml-6 lg:group-hover:text-base dark:text-slate-300">
                    {navLink.description}
                </p>
            </Link>
        </Card>
    {/each}
</div>
