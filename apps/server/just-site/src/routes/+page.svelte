<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import Card from "../components/Card.svelte";
    import Page from "../components/Page.svelte";
    import { clsx } from "clsx";
    import { animationDelay } from "../helpers/animationDelay";

    export let data: PageData;
    const { siteInfo, routes } = data;

    const homePageLinks = routes.filter(r => r.route !== "/");
    const findRouteColor = (route: string) => {
        return routes?.find(r => r.route === route)?.color || "var(--accent)";
    };

    const headingClass = clsx(
        "m-4 md:m-6",
        "group-hover:mt-2 group-hover:mb-6 sm:group-hover:mb-8 md:group-hover:mt-4 lg:group-hover:mt-3",
        "cursor-pointer !mb-0 dark:!text-white group-hover:!text-[var(--hover-color)]",
        "!transition-all",
    );
</script>

<Page routes={routes}
      siteInfo={siteInfo}
      title={{title: siteInfo.title, class: "dark:text-primary-500"}}>
    <div class="flex gap-1.5 justify-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
        {#each siteInfo.socials as social, idx (idx)}
            <Link href={social.href} title={social.title} noStyle class="hover:scale-110 transition-transform">
                <Icon class="w-7 h-7 md:w-9 md:h-9 transition drop-shadow hover:text-[var(--hover-color)] animate-fadeInSubtle opacity-0"
                      icon={social.icon}
                      style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`}
                />
            </Link>
        {/each}
    </div>
    <div class="flex flex-col md:grid md:grid-cols-2 gap-4 w-4/5 sm:w-3/4 md:w-11/12 lg:w-full xl:w-3/4 mx-auto">
        {#each homePageLinks as navLink, idx (idx)}
            <Card style={`--hover-color: ${findRouteColor(navLink.route)}; ${animationDelay(idx)}`}
                  safeBg
                  class="flex h-16 md:h-20 group border-l-4 hover:border-l-8 border-[var(--hover-color)] !outline-0 !hover:outline-0">
                <Link
                    title={navLink.name}
                    noStyle
                    class="flex flex-col w-full h-full"
                    href={navLink.route}>
                    <Heading class={headingClass}
                             level="h3">{navLink.name}</Heading>
                    <p class="text-0 h-0 text-slate-600 dark:text-slate-300 sm:group-hover:text-sm lg:group-hover:text-base transition-fontSize ml-4 sm:ml-5 md:ml-6">{navLink.description}</p>
                </Link>
            </Card>
        {/each}
    </div>
</Page>
