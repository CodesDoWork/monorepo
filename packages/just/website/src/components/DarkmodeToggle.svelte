<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { Theme } from "../stores/theme.svelte";

    interface Props {
        class?: string;
        isOnHero: boolean;
        theme: Theme;
        setTheme: (theme: Theme) => void;
    }

    const { class: className = "", isOnHero, theme, setTheme }: Props = $props();

    const animationDuration = 300;
    let icon = $state("");
    $effect(() => {
        let iconName: string;
        if (theme === Theme.Light) {
            iconName = "material-symbols:dark-mode-outline";
        } else if (theme === Theme.Dark) {
            iconName = "material-symbols:desktop-windows-outline-rounded";
        } else if (theme === Theme.OS) {
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
        setTheme(
            theme === Theme.Light ? Theme.Dark : theme === Theme.Dark ? Theme.OS : Theme.Light,
        );
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, animationDuration);
    };

    const resultClass = $derived(clsx(isAnimating && "animate-switch", className));
    const iconClass = $derived(
        clsx(isOnHero ? "text-black dark:text-white" : "text-white", "size-6"),
    );
</script>

<button class={resultClass} disabled={isAnimating} onclick={toggleTheme}>
    <Icon class={iconClass} {icon} />
</button>
