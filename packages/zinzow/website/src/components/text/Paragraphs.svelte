<script lang="ts">
    import { P } from ".";

    interface Props {
        text: string;
    }

    const { text }: Props = $props();
    const paragraphs = text.split("\n").filter(Boolean);
</script>

{#each paragraphs as paragraph, idx (idx)}
    <P>{paragraph}</P>
{/each}
