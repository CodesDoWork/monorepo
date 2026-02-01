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

<div class="grid h-screen grid-cols-[4rem_1fr_4rem] grid-rows-[min-content_1fr]">
    <BackButton />
    <H1>{page.data.title}</H1>
    <div
        class="
            col-span-3 grid size-full min-h-0 grid-cols-1 content-stretch gap-4 px-4
            2xl:grid-cols-[1fr_minmax(64rem,70%)_1fr]
        ">
        {@render children?.()}
    </div>
</div>
