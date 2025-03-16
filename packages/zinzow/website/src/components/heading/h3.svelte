<script lang="ts">
    import type { Snippet } from "svelte";
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    interface Props {
        class?: string;
        children?: Snippet;
    }

    const { class: className = "", children }: Props = $props();
</script>

<Heading tag="h3" class={classNames("text-2xl sm:text-3xl", className)}>
    {@render children?.()}
</Heading>
