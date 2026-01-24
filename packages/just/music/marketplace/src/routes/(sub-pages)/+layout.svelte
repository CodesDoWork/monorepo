<script lang="ts">
    import type { Snippet } from "svelte";
    import { page } from "$app/state";
    import { H1 } from "@cdw/monorepo/just-shared-svelte-components/texts";
    import { BackButton } from "../../components/buttons";

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
