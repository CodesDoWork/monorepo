<script lang="ts">
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    interface Props {
        class?: string;
        children?: import('svelte').Snippet;
    }

    let { class: className = "", children }: Props = $props();
    
</script>

<Heading tag="h3" class={classNames("text-base/7", className)}>
    {@render children?.()}
</Heading>
