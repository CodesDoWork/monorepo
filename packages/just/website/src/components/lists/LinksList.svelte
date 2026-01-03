<script lang="ts">
    import { Link } from "../texts";
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

<ListWithHeading listClass="gap-4" {text} items={links} direction="column">
    {#snippet display(link)}
        <Link class="text-nowrap" href={link.url} title={link.title}>> {link.title}</Link>
    {/snippet}
</ListWithHeading>
