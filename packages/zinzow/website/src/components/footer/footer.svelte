<script lang="ts">
    import type { RouteFragment } from "../../graphql/default/generated/graphql";
    import { clsx } from "clsx";
    import { smallTextClasses } from "../../lib/common/styles";
    import { WidthBox } from "../content-area";
    import { H5 } from "../heading";
    import { SocialIcons } from "../icons";
    import { Logo } from "../logo";

    interface Props {
        currentRoute?: RouteFragment;
        projectDescription: string;
        copyright: string;
        socialMedias: {
            url: string;
            icon: string;
            name: string;
            user: string;
        }[];
        footerSections: {
            name: string;
            routes?: {
                route?: {
                    name: string;
                    path: string;
                };
            }[];
        }[];
    }

    const { currentRoute, projectDescription, copyright, socialMedias, footerSections }: Props =
        $props();
</script>

<footer class={clsx(!currentRoute?.isHero && "mt-12", "row-start-3 w-screen")}>
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
                            bg-logoBg size-40 rounded-sm p-4 shadow-md
                            md:size-56
                            dark:fill-black!
                        " />
                </a>
                <p class={smallTextClasses}>
                    {projectDescription}
                </p>
                <div class="flex gap-x-6">
                    {#each socialMedias as socialMedia}
                        <a
                            href={socialMedia.url}
                            class={clsx(
                                smallTextClasses,
                                `
                                    transition-colors
                                    hover:text-gray-950
                                    dark:hover:text-white
                                `,
                            )}
                            target="_blank"
                            title={`${socialMedia.user} @ ${socialMedia.name}`}
                            rel="noopener noreferrer">
                            <span class={clsx(SocialIcons[socialMedia.icon], "size-6")}></span>
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
                            {#each sectionRoutes as { route }}
                                <li>
                                    <a
                                        href={route.path}
                                        class={clsx(
                                            smallTextClasses,
                                            `
                                                transition-colors
                                                hover:text-gray-950
                                                dark:hover:text-white
                                            `,
                                        )}>
                                        {route.name}
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
                sm:mt-20
                md:flex-row
                lg:mt-24
                dark:border-white/10
            ">
            <p class={smallTextClasses}>
                &copy; {copyright}
            </p>
            <p
                class={clsx(
                    smallTextClasses,
                    `
                        mt-6
                        md:mt-0
                    `,
                )}>
                Made with <span class="icon-[noto--red-heart] -mb-px"></span>&nbsp; by
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
