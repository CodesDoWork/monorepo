<script lang="ts">
    import classNames from "classnames";
    import { Text } from ".";

    interface Props {
        class?: string;
        text: string;
        size?: "base" | "lg";
    }

    const { class: className = "", text, size = "lg" }: Props = $props();
    const paragraphs = text.split("\n");
</script>

<article class={className}>
    {#each paragraphs as paragraph, idx (idx)}
        {#if paragraph}
            <Text
                tag="p"
                class={classNames(
                    {
                        "mt-4": idx > 0 && paragraphs[idx - 1] === "",
                        "text-lg/8 sm:text-xl/8": size === "lg",
                        "text-base/7": size === "base",
                    },
                    "text-pretty font-medium",
                )}>
                {paragraph}
            </Text>
        {/if}
    {/each}
</article>
