<script lang="ts">
    import Icon from "@iconify/svelte";
    import { localStorageStore } from "../helpers/localStorageStore";
    import { onMount } from "svelte";
    import { clsx } from "clsx";

    let className = "";
    export { className as class };

    const animationDuration = 300;

    let theme = "";
    let themeStore = undefined;
    onMount(() => {
        themeStore = localStorageStore("theme", window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
        themeStore.subscribe(value => {
            theme = value;
        });
    });

    let icon = "";
    $: if (theme === "dark") {
        document.documentElement.classList.add("dark");
        setTimeout(() => icon = "material-symbols:light-mode-outline", icon ? animationDuration / 2 : 0);
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        setTimeout(() => icon = "material-symbols:dark-mode-outline", icon ? animationDuration / 2 : 0);
    }

    let isAnimating = false
    const toggleTheme = () => {
        themeStore?.set(theme === "light" ? "dark" : "light");
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false
        }, animationDuration);
    };

    $: resultClass = clsx(isAnimating && "animate-switch", className)

</script>

<button class={resultClass} disabled={isAnimating} on:click={toggleTheme} >
    <Icon class="w-6 h-6 dark:text-white" icon={icon} />
</button>


