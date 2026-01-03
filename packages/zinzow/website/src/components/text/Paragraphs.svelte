<script lang="ts">
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { P } from ".";
    import { fadeIn } from "../../lib/common/styles";

    interface Props {
        text: string;
        animationDelay?: number;
    }

    const { text, animationDelay: delay }: Props = $props();
    const paragraphs = $derived(text.split("\n").filter(Boolean));
</script>

{#each paragraphs as paragraph, idx (idx)}
    <P class={delay && fadeIn} style={delay ? animationDelay(idx + delay) : undefined}>
        {paragraph}
    </P>
{/each}
