<script lang="ts">
    import { P } from ".";
    import { animationDelay, fadeIn } from "../../lib/client/animate";

    interface Props {
        text: string;
        animationDelay?: number;
    }

    const { text, animationDelay: delay }: Props = $props();
    const paragraphs = $derived(text.split("\n").filter(Boolean));
</script>

{#each paragraphs as paragraph, idx (idx)}
    <P class={delay && fadeIn()} style={delay ? animationDelay(idx + delay) : undefined}>
        {paragraph}
    </P>
{/each}
