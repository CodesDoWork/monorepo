<script lang="ts">
    import { clsx } from "clsx";
    import { Badge } from ".";

    interface Props {
        class?: string;
        badges: string[];
    }

    const { class: className = "", badges }: Props = $props();
</script>

<ul class={clsx(className, "flex gap-2")}>
    {#each badges as tag}
        <Badge tag="li">{tag}</Badge>
    {/each}
</ul>
