<script lang="ts">
    import Link from "./Link.svelte";
    import ListWithHeading from "./ListWithHeading.svelte";

    interface Props {
        text: string;
        links: {
            title: string;
            url: string;
        }[];
    }

    const { text, links }: Props = $props();
</script>

<ListWithHeading {text} items={links} direction="column">
    {#snippet display(link)}
        <Link href={link.url} title={link.title}>> {link.title}</Link>
    {/snippet}
</ListWithHeading>
