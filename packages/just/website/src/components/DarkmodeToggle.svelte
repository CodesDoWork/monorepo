<script lang="ts">
    import type { ThemeState } from "../states/theme.svelte";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Theme } from "../states/theme.svelte";

    interface Props {
        class?: string;
        isOnHero: boolean;
        theme: ThemeState;
    }

    const { class: className = "", isOnHero, theme }: Props = $props();

    const animationDuration = 300;
    let icon = $state("");
    $effect(() => {
        let iconName: string;
        if (theme.theme === Theme.Light) {
            iconName = "material-symbols:dark-mode-outline";
        } else if (theme.theme === Theme.Dark) {
            iconName = "material-symbols:desktop-windows-outline-rounded";
        } else if (theme.theme === Theme.OS) {
            iconName = "material-symbols:light-mode-outline";
        }

        if (icon) {
            setTimeout(() => (icon = iconName), animationDuration / 2);
        } else {
            icon = iconName;
        }
    });

    let isAnimating = $state(false);
    const toggleTheme = () => {
        let nextTheme;
        if (theme.theme === Theme.Light) {
            nextTheme = Theme.Dark;
        } else if (theme.theme === Theme.Dark) {
            nextTheme = Theme.OS;
        } else if (theme.theme === Theme.OS) {
            nextTheme = Theme.Light;
        }

        theme.setTheme(nextTheme);

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

<button class={resultClass} disabled={isAnimating} onclick={toggleTheme}>
    <Icon class={iconClass} {icon} />
</button>
