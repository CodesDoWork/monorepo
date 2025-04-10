<script lang="ts">
    import Label from "./Label.svelte";
    import ListWithHeading from "./ListWithHeading.svelte";

    interface Props {
        text: string;
        technologies: {
            name: string;
            icon: string;
        }[];
    }

    const { text, technologies }: Props = $props();
</script>

<ListWithHeading {text} items={technologies}>
    {#snippet display(technology)}
        <Label tag="li" name={technology.name} icon={technology.icon} />
    {/snippet}
</ListWithHeading>
