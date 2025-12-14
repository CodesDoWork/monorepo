<script lang="ts">
    import type { RouteFragment } from "../../graphql/default/generated/graphql";
    import type { LayoutData } from "../../routes/$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { WidthBox } from "../content-area";
    import { H5 } from "../heading";
    import { Logo } from "../logo";

    interface Props {
        data: LayoutData;
        currentRoute?: RouteFragment;
    }

    const { data, currentRoute }: Props = $props();
    const { settings, socialMedias, footerSections } = $derived(data);
</script>

<footer
    class={clsx(
        `
            bg-white
            dark:bg-(--primary-950)
        `,
        !currentRoute?.isHero && "mt-6",
    )}>
    <WidthBox class="pt-0">
        <div
            class="
                border-t border-gray-900/10 pt-12
                xl:grid xl:grid-cols-7 xl:gap-8
                dark:border-white/10
            ">
            <div
                class="
                    col-span-3 space-y-4
                    sm:space-y-7
                ">
                <a href="/" class="inline-block">
                    <Logo
                        class="
                            size-40 rounded bg-(--logoBg) p-4 shadow-md
                            md:size-56
                            dark:fill-black!
                        " />
                </a>
                <p
                    class="
                        text-sm/6 text-balance text-gray-600
                        dark:text-gray-400
                    ">
                    {settings.project_descriptor}
                </p>
                <div class="flex gap-x-6">
                    {#each socialMedias as socialMedia}
                        <a
                            href={socialMedia.url}
                            class="
                                text-gray-600 transition-colors
                                hover:text-gray-800
                                dark:hover:text-gray-300
                            "
                            target="_blank"
                            title={`${socialMedia.user} @ ${socialMedia.name}`}
                            rel="noopener noreferrer">
                            <Icon icon={socialMedia.icon} class="size-6" />
                        </a>
                    {/each}
                </div>
            </div>
            <div
                class="
                    mt-16 grid grid-cols-2 gap-10
                    sm:grid-cols-3
                    xl:col-span-4 xl:mt-0
                ">
                {#each footerSections as footerSection}
                    {@const sectionRoutes = footerSection.routes}
                    <div>
                        <H5>{footerSection.name}</H5>
                        <ul
                            role="list"
                            class="
                                mt-5 space-y-3
                                sm:mt-6 sm:space-y-4
                            ">
                            {#each sectionRoutes as route}
                                <li>
                                    <a
                                        href={route.routes_id.path}
                                        class="
                                            text-sm/6 text-gray-600 transition-colors
                                            hover:text-gray-950
                                            dark:text-gray-400 dark:hover:text-white
                                        ">
                                        {route.routes_id.name}
                                    </a>
                                </li>
                            {/each}
                        </ul>
                    </div>
                {/each}
            </div>
        </div>
        <div
            class="
                relative mt-16 flex flex-col justify-between border-t border-gray-900/10 pt-5
                text-gray-600
                sm:mt-20
                md:flex-row
                lg:mt-24
                dark:border-white/10 dark:text-gray-400
            ">
            <p class="text-sm/6">
                &copy; {settings.copyright}
            </p>
            <p
                class="
                    mt-6 text-sm/6
                    md:mt-0
                ">
                Made with <Icon icon="noto:red-heart" class="inline-block" />&nbsp; by
                <a
                    href="https://justinkonratt.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="
                        transition-colors
                        hover:text-gray-950
                        dark:hover:text-white
                    ">
                    Justin Konratt
                </a>
            </p>
        </div>
    </WidthBox>
</footer>
