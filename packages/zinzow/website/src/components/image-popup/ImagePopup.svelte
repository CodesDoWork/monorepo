<script lang="ts">
    import type { Writable } from "svelte/store";
    import classNames from "classnames";
    import { nonpassive } from "svelte/legacy";

    interface Props {
        isOpen: Writable<boolean>;
        selectedImage: {
            title?: string;
            url: string;
        };
    }

    const { isOpen, selectedImage }: Props = $props();

    let zoom = $state(1);
    let dragDialogImage = $state(false);
    let dragStartX = 0;
    let dragStartY = 0;
    let translateDialogImageX = $state(0);
    let translateDialogImageY = $state(0);

    function handleWheel(event: Event) {
        const { deltaY } = event as WheelEvent;
        if ($isOpen) {
            event.preventDefault();
            zoom -= deltaY / 1_000;
            zoom = Math.min(Math.max(1, zoom), 5);
            if (zoom === 1) {
                translateDialogImageX = 0;
                translateDialogImageY = 0;
            }
        }
    };

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

    isOpen.subscribe(isShown => {
        if (!isShown) {
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
    open={$isOpen}
    class="fixed inset-0 z-50 h-screen w-screen bg-black/80"
    onmouseup={() => !dragDialogImage && isOpen.set(false)}>
    <div
        id="image-container"
        class="absolute left-1/2 top-1/2 max-h-[80vh] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
        style="width: 80vw; height: 80vh;">
        <img
            onmousedown={handleDragStart}
            alt={selectedImage.title}
            src={selectedImage.url}
            style="transform: scale({zoom}) translate({translateDialogImageX}px, {translateDialogImageY}px)"
            class={classNames(
                zoom > 1 ? (dragDialogImage ? "cursor-grabbing" : "cursor-grab") : "cursor-default",
                "m-auto max-h-full max-w-full rounded-lg object-contain shadow-lg",
            )} />
    </div>
</dialog>
