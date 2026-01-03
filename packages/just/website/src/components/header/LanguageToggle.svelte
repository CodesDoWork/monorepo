<script lang="ts">
    import type { LanguageFragment } from "../../graphql/default/generated/graphql";
    import type { Route } from "../../routes/types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        currentLanguage: LanguageFragment;
        languages: LanguageFragment[];
        currentRoute: Route;
    }

    const { class: className, currentLanguage, languages, currentRoute }: Props = $props();
    const useCustomColor = $derived(!currentRoute || currentRoute.color === "#000000");
    const textColor = $derived(useCustomColor ? "text-black dark:text-white" : "text-white");
    const displayHoverColor = $derived(useCustomColor ? "hover:text-white" : "hover:text-black");
    const liHoverColor = $derived(
        useCustomColor
            ? "hover:bg-primary-300 dark:hover:bg-primary-600 active:bg-primary-300 dark:active:bg-primary-600"
            : "hover:bg-pageColor active:bg-pageColor",
    );

    const selectLanguage = (language: LanguageFragment) => {
        fetch(`/api/setLanguage/${language.code}`).then(() => window.location.reload());
    };

    let isSelectionVisible = $state(false);
</script>

<div
    class={clsx(
        className,
        textColor,
        displayHoverColor,
        `
            group relative font-mono transition
            dark:hover:text-secondary-500
            hover:drop-shadow-md
        `,
    )}>
    <button onclick={() => (isSelectionVisible = !isSelectionVisible)} class="cursor-default">
        {currentLanguage.short.toUpperCase()}
    </button>
    <div
        class={clsx(
            `absolute right-0 pt-2 transition-all`,
            isSelectionVisible
                ? "visible translate-y-0 opacity-100"
                : `
                    invisible translate-y-4 opacity-0
                    group-hover:visible group-hover:translate-y-0 group-hover:opacity-100
                `,
        )}>
        <ul
            class={clsx(`
                dark:bg-primary-800
                rounded bg-white shadow-md
            `)}>
            {#each languages as language}
                {#if language.code !== currentLanguage.code}
                    <li
                        class={clsx(
                            `
                                rounded text-black
                                dark:text-white
                            `,
                            liHoverColor,
                        )}>
                        <button
                            onclick={() => selectLanguage(language)}
                            class="flex items-center gap-3 px-4 py-2">
                            <Icon icon={`circle-flags:${language.short}`} class="size-5"></Icon>
                            {language.name}
                        </button>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>
