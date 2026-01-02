<script lang="ts">
    import { Label } from "../label";
    import ListWithHeading from "./ListWithHeading.svelte";

    interface Props {
        text?: string;
        technologies: {
            name: string;
            icon: string;
        }[];
    }

    const { text, technologies }: Props = $props();
</script>

<ListWithHeading {text} items={technologies}>
    {#snippet display(technology)}
        <li>
            <Label name={technology.name} icon={technology.icon} />
        </li>
    {/snippet}
</ListWithHeading>
