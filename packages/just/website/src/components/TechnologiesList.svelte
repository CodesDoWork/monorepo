<script lang="ts">
    import ListWithHeading from "./ListWithHeading.svelte";
    import Technology from "./Technology.svelte";

    interface Props {
        text: string;
        technologies: {
            name: string;
        }[];
    }

    const { text, technologies }: Props = $props();
</script>

<ListWithHeading {text} items={technologies}>
    {#snippet display(technology)}
        <Technology tag="li" technology={technology.name} />
    {/snippet}
</ListWithHeading>
