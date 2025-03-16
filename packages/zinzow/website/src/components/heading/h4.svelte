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

<Heading tag="h3" class={classNames("text-base/7", className)}>
    {@render children?.()}
</Heading>
