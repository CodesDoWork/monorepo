<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../components/Card.svelte";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import Page from "../components/Page.svelte";
    import { animationDelay } from "../helpers/animationDelay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { siteInfo, routes } = data;

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

<Page {routes} {siteInfo} title={{ title: siteInfo.title, class: "dark:text-primary-500" }}>
    <div class="mb-12 flex justify-center gap-1.5 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
        {#each siteInfo.socials as social, idx (idx)}
            <Link
                href={social.href}
                title={social.title}
                noStyle
                class="transition-transform hover:scale-110">
                <Icon
                    class="animate-fadeInSubtle h-7 w-7 opacity-0 drop-shadow transition hover:text-[var(--hover-color)] md:h-9 md:w-9"
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
</Page>
