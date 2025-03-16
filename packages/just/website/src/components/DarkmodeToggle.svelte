<script lang="ts">
    import type { Writable } from "svelte/store";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        is_on_hero: boolean;
        theme: Writable<string>;
    }

    let { class: className = "", is_on_hero, theme }: Props = $props();

    const animationDuration = 300;
    let icon = $state("");
    $effect(() => {
        let iconName: string;
        if ($theme === "dark") {
            document.documentElement.classList.add("dark");
            iconName = "material-symbols:light-mode-outline";
        } else if ($theme === "light") {
            document.documentElement.classList.remove("dark");
            iconName = "material-symbols:dark-mode-outline";
        }

        if (icon) {
            setTimeout(() => (icon = iconName), animationDuration / 2);
        } else {
            icon = iconName;
        }
    });

    let isAnimating = $state(false);
    const toggleTheme = () => {
        theme?.set($theme === "light" ? "dark" : "light");
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    };

    let resultClass = $derived(clsx(isAnimating && "animate-switch", className));
    let iconClass = $derived(
        clsx(is_on_hero ? "text-black dark:text-white" : "text-white", "size-6"),
    );
</script>

<button class={resultClass} disabled={isAnimating} onclick={toggleTheme}>
    <Icon class={iconClass} {icon} />
</button>
