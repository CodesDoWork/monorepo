<script lang="ts">
    import type { Readable } from "svelte/store";
    import type { Route } from "../routes/types";
    import { page } from "$app/state";
    import { clsx } from "clsx";
    import Heading from "./Heading.svelte";

    interface Props {
        currentRoute: Readable<Route>;
    }

    const { currentRoute }: Props = $props();

    let isHero = $state(true);
    let text = $state("");

    currentRoute.subscribe(route => {
        isHero = route.isHero;
        text = route.name;
    });

    const isSmall = $derived(page.error ? false : !isHero);
    const titleText = $derived(page.error ? page.status.toString() : text);
</script>

<Heading
    animateText={titleText}
    blinkCursor={!isSmall}
    class={clsx(
        "select-none !drop-shadow-lg",
        !isSmall && "!mt-16 text-center !text-3xl sm:!text-4xl md:!text-5xl lg:mt-20 xl:!text-6xl",
        $currentRoute.route === "/" && "dark:text-primary-500",
    )}
    commandStyle={isSmall}
    level="h1" />
