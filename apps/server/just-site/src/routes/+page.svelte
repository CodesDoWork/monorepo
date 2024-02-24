<script lang="ts">
    import Icon from "@iconify/svelte";
    import { socialNetworks } from "../constants";
    import { config } from "../config";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import Card from "../components/Card.svelte";
    import Page from "../components/Page.svelte";

    const { routeLinks } = config;
    const homePageLinks = routeLinks.filter((rl) => rl.route !== "/");

    const userSocials = Object.keys(config.contact.socials);
    const limit = config.contact.socialButtonLimit;

    const socialLinks = userSocials.slice(0, limit).map((social) => {
        const socialProps = socialNetworks.find((sn) => sn.name === social);
        if (!socialProps) return null;
        const user = config.contact.socials[social];
        return {
            ...socialProps,
            user,
            href: socialProps.link + user,
            title: `${socialProps.noAt ? "" : "@"}${user} on ${socialProps.name}`,
        };
    });

    const findRouteColor = (route: string) => {
        return routeLinks?.find((r) => r.route === route)?.color || "var(--accent)";
    };
</script>

<Page title={{title: "Justin Konratt", class: "dark:text-primary-500"}}>
    <div class="flex gap-1.5 justify-center mb-12 sm:mb-16 md:mb-24 lg:mb-32 xl:mb-40">
        {#each socialLinks as social, idx (idx)}
            <Link href={social.href} title={social.title} external icon class="hover:scale-110 transition-transform">
                <Icon class="w-7 h-7 md:w-9 md:h-9 transition drop-shadow dark:text-white hover:text-[var(--hover-color)] animate-fadeInSubtle opacity-0"
                      icon={social.icon}
                      style={`--hover-color: ${social.tone}; animation-delay: ${idx * 0.05}s;`}
                />
            </Link>
        {/each}
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 w-4/5 sm:w-3/4 md:w-11/12 lg:w-full xl:w-3/4 mx-auto">
        {#each homePageLinks as navLink, idx (idx)}
            <Card style={`--hover-color: ${findRouteColor(navLink.route)}; animation-delay: ${idx * 0.1}s;`}
                  class="group border-l-4 hover:border-l-8 border-[var(--hover-color)]">
                <a
                    class="p-4 sm:p-5 md:p-6 md:h-20 w-full hover:pt-2 hover:pb-6 sm:hover:pb-8 md:hover:pt-4 lg:hover:pt-3 transition-all"
                    href={navLink.route}>
                    <Heading class="cursor-pointer !mb-0 dark:!text-white group-hover:!text-[var(--hover-color)]"
                             level="h3">{navLink.label}</Heading>
                    <p class="text-0 h-0 text-slate-600 dark:text-slate-300 sm:group-hover:text-sm lg:group-hover:text-base transition-fontSize">{navLink.description}</p>
                </a>
            </Card>
        {/each}
    </div>
</Page>
