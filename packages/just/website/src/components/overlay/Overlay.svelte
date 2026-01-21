<script lang="ts">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { clsx } from "clsx";
    import { blur } from "svelte/transition";
    import { getOverlayContext } from "../../contexts/overlay";

    const overlayContext = getOverlayContext();
    const img: DirectusImageParams = $derived.by(() => {
        if (!overlayContext.img) {
            return undefined;
        }

        const url = new URL(overlayContext.img.src);
        url.searchParams.delete("width");
        url.searchParams.delete("quality");
        return { ...overlayContext.img, src: url.href };
    });
</script>

{#if img}
    <dialog
        open
        transition:blur={{ duration: 200 }}
        class="fixed inset-0 z-50 h-screen w-screen bg-black/75"
        onmouseup={() => delete overlayContext.img}>
        <DirectusImage
            {img}
            lazy
            sourceClass="left-1/2 right-auto -translate-x-1/2"
            class="
                absolute! top-1/2 left-1/2 h-[80vh] max-h-[80vh] w-[80vw] max-w-[80vw]
                -translate-1/2 overflow-hidden rounded-lg
            "
            imgClass={clsx(
                "m-auto h-full max-h-full w-fit max-w-full rounded-lg object-contain!",
            )} />
    </dialog>
{/if}
