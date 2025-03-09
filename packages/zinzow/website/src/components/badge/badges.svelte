<script lang="ts">
    import classNames from "classnames";
    import { Badge } from ".";

    let className = "";
    export { className as class };
    export let badges: string[];
</script>

<ul class={classNames(className, "flex gap-2")}>
    {#each badges as tag}
        <Badge tag="li">{tag}</Badge>
    {/each}
</ul>
