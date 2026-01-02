<script lang="ts">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { clsx } from "clsx";
    import { nonpassive } from "svelte/legacy";

    interface Props {
        isOpen: boolean;
        setIsOpen: (isOpen: boolean) => void;
        selectedImage: DirectusImageParams;
    }

    const { isOpen, setIsOpen, selectedImage }: Props = $props();
    const img: DirectusImageParams = $derived.by(() => {
        const url = new URL(selectedImage.src);
        url.searchParams.delete("height");
        url.searchParams.delete("quality");
        return { ...selectedImage, src: url.href };
    });

    let zoom = $state(1);
    let dragDialogImage = $state(false);
    let dragStartX = 0;
    let dragStartY = 0;
    let translateDialogImageX = $state(0);
    let translateDialogImageY = $state(0);

    function handleWheel(event: Event) {
        const { deltaY } = event as WheelEvent;
        if (isOpen) {
            event.preventDefault();
            zoom -= deltaY / 1_000;
            zoom = Math.min(Math.max(1, zoom), 5);
            if (zoom === 1) {
                translateDialogImageX = 0;
                translateDialogImageY = 0;
            }
        }
    }

    function handleDragStart(event: MouseEvent) {
        event.preventDefault();
        dragDialogImage = true;
        dragStartX = event.clientX - translateDialogImageX * zoom;
        dragStartY = event.clientY - translateDialogImageY * zoom;
    }

    function handleDragOver(event: MouseEvent) {
        if (dragDialogImage && zoom > 1) {
            event.preventDefault();
            translateDialogImageX = (event.clientX - dragStartX) / zoom;
            translateDialogImageY = (event.clientY - dragStartY) / zoom;
        }
    }

    $effect(() => {
        if (!isOpen) {
            dragDialogImage = false;
            translateDialogImageX = 0;
            translateDialogImageY = 0;
            zoom = 1;
        }
    });
</script>

<svelte:window
    use:nonpassive={["wheel", () => handleWheel]}
    onmousemove={handleDragOver}
    onmouseup={() => (dragDialogImage = false)} />
<!-- svelte-ignore a11y_click_events_have_key_events -->
<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<dialog
    open={isOpen}
    class="fixed inset-0 z-50 h-screen w-screen bg-black/85"
    onmouseup={() => !dragDialogImage && setIsOpen(false)}>
    <DirectusImage
        onmousedown={handleDragStart}
        lazy
        {img}
        imgStyle="transform: scale({zoom}) translate({translateDialogImageX}px, {translateDialogImageY}px)"
        id="image-container"
        sourceClass="left-1/2 right-auto -translate-x-1/2"
        class="
            absolute! top-1/2 left-1/2 h-[80vh] max-h-[80vh] w-[80vw] max-w-[80vw] -translate-x-1/2
            -translate-y-1/2 overflow-hidden rounded-lg
        "
        imgClass={clsx(
            zoom > 1 ? (dragDialogImage ? "cursor-grabbing" : "cursor-grab") : "cursor-default",
            "m-auto h-full max-h-full w-fit max-w-full rounded-lg object-contain!",
        )} />
</dialog>
