<script lang="ts">
    import type { PageData } from "./$types";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { byField } from "@cdw/monorepo/shared-utils/filters";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Card } from "../components/card";
    import { H3, Link } from "../components/texts";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { routes, socials, jsonLdThings } = $derived(data);
    $effect(() => addJsonLdThings(jsonLdThings));

    const homePageLinks = $derived(routes.filter(r => r.inNav));
    const findRouteColor = (route: string) => {
        return routes?.find(byField("route", route))?.color || "var(--accent)";
    };

    const headingClass = clsx(
        `
            m-5 mb-0! cursor-pointer transition-all!
            group-hover:mt-3 group-hover:mb-6 group-hover:text-(--hover-color)
            sm:group-hover:mt-2 sm:group-hover:mb-8
            md:mx-6! md:mt-6!
            md:group-hover:mt-4!
            lg:group-hover:mt-3!
            dark:text-white
            dark:group-hover:text-(--hover-color)
        `,
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
                    animate-fadeInSubtle size-full opacity-0 drop-shadow-sm transition
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
                group flex h-16 border-l-4 border-(--hover-color) outline-0!
                hover:border-l-8 hover:outline-0!
                md:h-20
            ">
            <Link
                title={navLink.name}
                noStyle
                class="flex size-full flex-col"
                href={navLink.route}>
                <H3 class={headingClass}>{navLink.name}</H3>
                <p
                    class="
                        text-0 ml-4 h-0 text-slate-600 transition-[font-size]
                        sm:ml-5
                        sm:group-hover:text-sm
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
