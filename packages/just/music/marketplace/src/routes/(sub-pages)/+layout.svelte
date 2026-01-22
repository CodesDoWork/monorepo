<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/state";
    import { BackButton } from "../../components/buttons";
    import { H1 } from "../../components/texts";

    interface Props {
        children?: Snippet;
    }

    const { children }: Props = $props();
</script>

<div class="grid h-screen grid-rows-[min-content_min-content_1fr]">
    <BackButton />
    <H1>{page.data.title}</H1>
    {@render children?.()}
</div>
