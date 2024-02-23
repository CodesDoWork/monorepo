<script lang="ts">
    import Icon from "@iconify/svelte";
    import { localStorageStore } from "../helpers/localStorageStore";
    import { onMount } from "svelte";

    let className;
    export { className as class };

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
        icon = "material-symbols:light-mode-outline";
    } else if (theme === "light") {
        document.documentElement.classList.remove("dark");
        icon = "material-symbols:dark-mode-outline";
    }

    const toggleTheme = () => {
        if ("theme" in localStorage) {
            themeStore?.set(theme === "light" ? "dark" : "light");
        }
    };

</script>

<button class={className} on:click={toggleTheme}>
    <Icon class="w-6 h-6 dark:text-white" icon={icon} />
</button>


