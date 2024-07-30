<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import type { Writable } from "svelte/store";

    let className = "";
    export { className as class };
    export let is_on_hero: boolean;
    export let theme: Writable<string>;

    const animationDuration = 300;
    let icon = "";
    $: {
        let iconName;
        if ($theme === "dark") {
            document.documentElement.classList.add("dark");
            iconName = "material-symbols:light-mode-outline";
        } else if ($theme === "light") {
            document.documentElement.classList.remove("dark");
            iconName = "material-symbols:dark-mode-outline";
        }

        if (icon) {
            setTimeout(() => icon = iconName, animationDuration / 2);
        } else {
            icon = iconName;
        }
    }

    let isAnimating = false;
    const toggleTheme = () => {
        theme?.set($theme === "light" ? "dark" : "light");
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    };

    $: resultClass = clsx(isAnimating && "animate-switch", className);
    $: iconClass = clsx(is_on_hero ? "text-black dark:text-white" : "text-white", "w-6 h-6");
</script>

<button class={resultClass} disabled={isAnimating} on:click={toggleTheme}>
    <Icon class={iconClass} icon={icon} />
</button>


