<script lang="ts">
    import type { Route } from "../../routes/types";
    import { page } from "$app/state";
    import { clsx } from "clsx";
    import { H1 } from ".";

    interface Props {
        currentRoute: Route;
    }

    const { currentRoute }: Props = $props();

    const isSmall = $derived(page.error ? false : !currentRoute?.isHero);
    const titleText = $derived(page.error ? page.status.toString() : currentRoute?.name);
</script>

<H1
    animateText={titleText}
    blinkCursor={!isSmall}
    class={clsx(
        "drop-shadow-lg! duration-1000 select-none",
        !isSmall &&
            `
                mt-16! text-center text-3xl!
                sm:text-4xl!
                md:text-5xl!
                lg:mt-20
                xl:text-6xl!
            `,
        (!currentRoute || currentRoute.color === "#000000") && "dark:text-primary-500",
    )}
    commandStyle={isSmall} />
