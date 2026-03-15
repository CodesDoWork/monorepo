<script lang="ts">
    import type { ThemeState } from "@cdw/monorepo/shared-svelte-states/theme";
    import { ThemeIcons } from "@cdw/monorepo/shared-svelte-states/theme";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        isOnHero: boolean;
        theme: ThemeState;
    }

    const { class: className = "", isOnHero, theme }: Props = $props();

    const animationDuration = 300;
    let icon = $state("");
    $effect(() => {
        const iconName = ThemeIcons[theme.theme];
        if (icon) {
            setTimeout(() => (icon = iconName), animationDuration / 2);
        } else {
            icon = iconName;
        }
    });

    let isAnimating = $state(false);
    const toggleTheme = () => {
        theme.toggleNextTheme();
        isAnimating = true;
        setTimeout(() => (isAnimating = false), animationDuration);
    };

    const resultClass = $derived(clsx(isAnimating && "animate-switch", className));
    const iconClass = $derived(
        clsx(
            isOnHero
                ? `
                    text-black
                    dark:text-white
                `
                : "text-white",
            "size-6",
        ),
    );
</script>

<button class={resultClass} disabled={isAnimating} onclick={toggleTheme} title="Toggle Theme">
    <span class={clsx(icon, iconClass)}></span>
</button>
