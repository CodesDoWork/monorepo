<script lang="ts">
    import type { PageData } from "./$types";
    import { byField } from "@cdw/monorepo/shared-utils/filters";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../components/Card.svelte";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import { getJsonLdContext } from "../contexts/jsonld";
    import { animationDelay } from "../shared/animationDelay";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { routes, socials, jsonLdThings } = data;
    getJsonLdContext().things = jsonLdThings;

    const homePageLinks = routes.filter(r => r.inNav);
    const findRouteColor = (route: string) => {
        return routes?.find(byField("route", route))?.color || "var(--accent)";
    };

    const headingClass = clsx(
        `
            m-5
            md:m-6
        `,
        `
            group-hover:mt-3 group-hover:mb-6
            sm:group-hover:mt-2 sm:group-hover:mb-8
            md:group-hover:mt-4
            lg:group-hover:mt-3
        `,
        `
            mb-0! cursor-pointer
            group-hover:text-(--hover-color)!
            dark:text-white!
        `,
        "transition-all!",
    );
</script>

<div
    class="
        mb-12 flex justify-center gap-3
        sm:mb-16
        md:mb-24
        lg:mb-32
        xl:mb-40
    ">
    {#each socials as social, idx (idx)}
        <Link
            isMe
            href={social.href}
            title={social.title}
            noStyle
            class="
                size-7 transition-transform
                hover:scale-110
                md:size-9
            ">
            <Icon
                class="
                    animate-fadeInSubtle h-full w-full opacity-0 drop-shadow transition
                    hover:text-(--hover-color)
                "
                icon={social.icon}
                style={`--hover-color: ${social.tone}; ${animationDelay(idx)}`} />
        </Link>
    {/each}
</div>
<div
    class="
        mx-auto flex w-4/5 flex-col gap-4
        sm:w-3/4
        md:grid md:w-11/12 md:grid-cols-2
        lg:w-full
        xl:w-3/4
    ">
    {#each homePageLinks as navLink, idx (idx)}
        <Card
            style={`--hover-color: ${findRouteColor(navLink.route)}; ${animationDelay(idx)}`}
            safeBg
            class="
                !hover:outline-0
                group flex h-16 border-l-4 border-(--hover-color) outline-0!
                hover:border-l-8
                md:h-20
            ">
            <Link
                title={navLink.name}
                noStyle
                class="flex h-full w-full flex-col"
                href={navLink.route}>
                <Heading class={headingClass} level="h3">{navLink.name}</Heading>
                <p
                    class="
                        text-0 ml-4 h-0 text-slate-600 transition-[font-size]
                        sm:ml-5 sm:group-hover:text-sm
                        md:ml-6
                        lg:group-hover:text-base
                        dark:text-slate-300
                    ">
                    {navLink.shortDescription}
                </p>
            </Link>
        </Card>
    {/each}
</div>
