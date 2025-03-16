<script lang="ts">
    import classNames from "classnames";
    import { Badge } from ".";

    
    interface Props {
        class?: string;
        badges: string[];
    }

    let { class: className = "", badges }: Props = $props();
</script>

<ul class={classNames(className, "flex gap-2")}>
    {#each badges as tag}
        <Badge tag="li">{tag}</Badge>
    {/each}
</ul>
