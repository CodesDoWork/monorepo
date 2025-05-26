<script lang="ts">
    import { blur } from "svelte/transition";
    import { getOverlayContext } from "../contexts/overlay";

    const overlayContext = getOverlayContext();
</script>

{#if overlayContext.img}
    <dialog
        open
        transition:blur={{ duration: 200 }}
        class="fixed inset-0 z-50 h-screen w-screen bg-black/75"
        onmouseup={() => delete overlayContext.img}>
        <div
            class="absolute left-1/2 top-1/2 w-[90vw] md:w-[80vw] lg:w-auto max-h-[80vh] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg">
            <img
                alt=""
                src={overlayContext.img}
                class="m-auto max-h-full max-w-full rounded-lg object-contain shadow-lg" />
        </div>
    </dialog>
{/if}
