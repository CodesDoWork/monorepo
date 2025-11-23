<script lang="ts">
    import type { LanguageFragment } from "../graphql/default/generated/graphql";
    import type { Route } from "../routes/types";
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
            ? "hover:bg-primary-300 dark:hover:bg-primary-600 "
            : "hover:bg-(--page-color)",
    );

    const selectLanguage = (language: LanguageFragment) => {
        fetch(`/api/setLanguage/${language.code}`).then(() => window.location.reload());
    };
</script>

<div
    class={clsx(
        className,
        textColor,
        displayHoverColor,
        "group relative font-mono transition hover:drop-shadow-md dark:hover:text-secondary-500",
    )}>
    <span class="cursor-default">{currentLanguage.short.toUpperCase()}</span>
    <div
        class={clsx(
            "invisible absolute right-0 translate-y-4 opacity-0",
            "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
            "transition-all",
            "pt-2",
        )}>
        <ul class={clsx("rounded bg-white shadow-md dark:bg-primary-800")}>
            {#each languages as language}
                {#if language.code !== currentLanguage.code}
                    <li class={clsx("rounded text-black dark:text-white", liHoverColor)}>
                        <button
                            onclick={() => selectLanguage(language)}
                            class="flex gap-3 items-center py-2 px-4">
                            <Icon icon={`circle-flags:${language.short}`} class="size-5"></Icon>
                            {language.name}
                        </button>
                    </li>
                {/if}
            {/each}
        </ul>
    </div>
</div>
