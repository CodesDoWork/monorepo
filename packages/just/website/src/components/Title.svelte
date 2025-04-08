<script lang="ts">
    import type { Route } from "../routes/types";
    import { page } from "$app/state";
    import { clsx } from "clsx";
    import Heading from "./Heading.svelte";

    interface Props {
        currentRoute: Route;
    }

    const { currentRoute }: Props = $props();

    const isSmall = $derived(page.error ? false : !currentRoute.isHero);
    const titleText = $derived(page.error ? page.status.toString() : currentRoute.name);
</script>

<Heading
    animateText={titleText}
    blinkCursor={!isSmall}
    class={clsx(
        "select-none !drop-shadow-lg duration-1000",
        !isSmall && "!mt-16 text-center !text-3xl sm:!text-4xl md:!text-5xl lg:mt-20 xl:!text-6xl",
        currentRoute.route === "/" && "dark:text-primary-500",
    )}
    commandStyle={isSmall}
    level="h1" />
