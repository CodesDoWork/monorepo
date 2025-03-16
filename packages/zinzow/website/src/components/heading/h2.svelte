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

<Heading tag="h2" class={classNames("mb-6 text-3xl sm:text-4xl", className)}>
    {@render children?.()}
</Heading>
