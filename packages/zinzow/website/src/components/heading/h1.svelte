<script lang="ts">
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    interface Props {
        class?: string;
        children?: import('svelte').Snippet;
    }

    let { class: className = "", children }: Props = $props();
    
</script>

<Heading tag="h1" class={classNames("mb-6 text-4xl sm:text-5xl", className)}>
    {@render children?.()}
</Heading>
