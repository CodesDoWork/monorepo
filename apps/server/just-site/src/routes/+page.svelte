<script lang="ts">
    import Icon from "@iconify/svelte";
    import { socialNetworks } from "../constants";
    import { config } from "../config";
    import Heading from "../components/Heading.svelte";
    import Link from "../components/Link.svelte";
    import DarkmodeToggle from "../components/DarkmodeToggle.svelte";

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

<div class="min-h-screen bg-gradient-to-b from-primary-500 from-5% to-secondary-500 to-95% pt-4 dark:from-primary-950 dark:to-secondary-950 transition-colors">
    <header class="text-end mb-12 mr-8">
        <DarkmodeToggle />
    </header>
    <Heading
        animateText="Justin Konratt"
        blinkCursor={true}
        class="text-6xl select-none mb-6 text-center drop-shadow-lg dark:text-primary-500 transition-colors"
        commandStyle={false}
        level="h1" />
    <div class="flex gap-1.5 justify-center mb-40">
        {#each socialLinks as social}
            <Link href={social.href} title={social.title} external>
                <Icon class="w-9 h-9 hover:scale-110 transition drop-shadow dark:text-white hover:text-[var(--hover-color)]"
                      icon={social.icon}
                      style={`--hover-color: ${social.tone};`}
                />
            </Link>
        {/each}
    </div>
    <div class="grid grid-cols-2 gap-4 w-3/5 mx-auto">
        {#each homePageLinks as navLink, idx (idx)}
            <a style={`--hover-color: ${findRouteColor(navLink.route)}; animation-delay: ${idx * 0.1}s;`}
               class="group bg-white bg-opacity-95 dark:bg-opacity-10 rounded-lg h-20 w-full p-6 hover:pt-3 hover:pb-2 transition-pColorsShadow shadow-md hover:shadow-lg border-l-4 border-[var(--hover-color)] animate-fadeIn opacity-0"
               href={navLink.route}>
                <Heading class="cursor-pointer text-2xl dark:text-white transition-colors group-hover:text-[var(--hover-color)]"
                         level="h3">{navLink.label}</Heading>
                <p class="text-0 h-0 text-slate-600 dark:text-slate-300 group-hover:text-base transition-fontSize">{navLink.description}</p>
            </a>
        {/each}
    </div>
</div>
