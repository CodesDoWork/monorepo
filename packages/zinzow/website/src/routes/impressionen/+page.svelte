<script lang="ts">
    import type { PageData } from "./$types";
    import classNames from "classnames";
    import { PageContent } from "../../components/content-area";
    import { H1, H3 } from "../../components/heading";
    import { by } from "@cdw/monorepo/shared-utils/filters";
    import { writable } from "svelte/store";
    import Icon from "@iconify/svelte";

    export let data: PageData;
    const { images, columns } = data.impressions;
    while (images.length < 2 * columns) {
        images.push(...images.map(image => ({ ...image })));
    }

    let selectedImage = images[0];
    let clickedSelectedImage = selectedImage;
    const showDialog = writable(false);
    const columnsArray = new Array(columns);

    function rotateImageBy(steps: number) {
        let idx = images.findIndex(by(selectedImage)) + steps;
        idx = idx % images.length;
        while (idx < 0) {
            idx += images.length;
        }
        selectedImage = images[idx];
    }

    function handleKey(event: KeyboardEvent) {
        function handle(func: () => void) {
            event.preventDefault();
            func();
        }

        if ($showDialog && event.key === "Escape") {
            handle(() => showDialog.set(false));
        } else if (!$showDialog && event.key === "Enter") {
            handle(() => showDialog.set(true));
        }

        if (event.key === "ArrowRight") {
            handle(() => rotateImageBy(1));
        } else if (event.key === "ArrowLeft") {
            handle(() => rotateImageBy(-1));
        } else if (event.key === "ArrowUp") {
            handle(() => rotateImageBy(-columns));
        } else if (event.key === "ArrowDown") {
            handle(() => rotateImageBy(columns));
        }
    }

    let zoom = 1;
    function handleWheel(event: WheelEvent) {
        if ($showDialog) {
            event.preventDefault();
            zoom -= event.deltaY / 1_000;
            zoom = Math.min(Math.max(1, zoom), 5);
            if (zoom === 1) {
                translateDialogImageX = 0;
                translateDialogImageY = 0;
            }
        }
    }

    let dragDialogImage = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let translateDialogImageX = 0;
    let translateDialogImageY = 0;
    function handleDragOver(event: MouseEvent) {
        if (dragDialogImage && zoom > 1) {
            event.preventDefault();
            translateDialogImageX = (event.clientX - dragStartX) / zoom;
            translateDialogImageY = (event.clientY - dragStartY) / zoom;
        }
    }

    function handleDragStart(event: MouseEvent) {
        event.preventDefault();
        dragDialogImage = true;
        dragStartX = event.clientX - translateDialogImageX * zoom;
        dragStartY = event.clientY - translateDialogImageY * zoom;
    }

    showDialog.subscribe(isShown => {
        if (!isShown) {
            dragDialogImage = false;
            translateDialogImageX = 0;
            translateDialogImageY = 0;
            zoom = 1;
        }
    });
</script>

<svelte:window
    on:wheel|nonpassive={handleWheel}
    on:mousemove={handleDragOver}
    on:mouseup={() => (dragDialogImage = false)}
    on:keydown={handleKey} />
{#if showDialog}
    <!-- svelte-ignore a11y-click-events-have-key-events -->
    <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
    <dialog
        open={$showDialog}
        class="fixed inset-0 z-50 h-screen w-screen bg-black/80"
        on:mouseup={() => !dragDialogImage && showDialog.set(false)}>
        <div
            id="image-container"
            class="absolute left-1/2 top-1/2 max-h-[80vh] max-w-[80vw] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg"
            style="width: 80vw; height: 80vh;">
            <img
                on:mousedown={handleDragStart}
                alt={selectedImage.title}
                src={selectedImage.url}
                style="transform: scale({zoom}) translate({translateDialogImageX}px, {translateDialogImageY}px)"
                class={classNames(
                    zoom > 1
                        ? dragDialogImage
                            ? "cursor-grabbing"
                            : "cursor-grab"
                        : "cursor-default",
                    "m-auto max-h-full max-w-full rounded-lg object-contain shadow-lg",
                )} />
        </div>
    </dialog>
{/if}
<PageContent class="isolate">
    <H1 class="mb-8 placeholder:lg:mb-12">{data.texts.title}</H1>
    <div class="grid grid-cols-1 lg:grid-cols-[60%_40%]">
        <div
            class="relative row-span-3 grid grid-cols-subgrid lg:col-span-2 lg:row-span-2 lg:mx-8 xl:mx-4 2xl:mx-0">
            <button on:click={() => showDialog.set(true)} class="h-[24rem] w-full md:h-[32rem]">
                <img
                    alt={selectedImage.title}
                    src={selectedImage.url}
                    class="mx-auto h-full object-contain object-bottom md:rounded-lg md:shadow-lg lg:w-full lg:object-cover" />
            </button>
            <div class="p-0 lg:row-start-auto lg:h-auto lg:p-6">
                <H3>{selectedImage.title}</H3>
                {#if selectedImage.description}
                    <p class="mt-4 text-base/7 text-gray-600 dark:text-gray-300">
                        {selectedImage.description}
                    </p>
                {/if}
                {#if selectedImage.location}
                    <div class="mt-8 flex gap-2">
                        <Icon icon="humbleicons:location" class="size-6 text-gray-400" />
                        <span class="text-gray-600 dark:text-gray-300">
                            {selectedImage.location}
                        </span>
                    </div>
                {/if}
                <ul class="mt-6 flex gap-2">
                    {#each selectedImage.tags ?? [] as tag}
                        <li class="bg-primary-600 rounded-md px-2 py-1 text-white shadow">{tag}</li>
                    {/each}
                </ul>
            </div>
            <div class="row-start-2 mb-8 mt-4 flex items-center justify-center gap-12 lg:m-0">
                <button on:click={() => rotateImageBy(-1)}>
                    <Icon
                        icon="mingcute:left-line"
                        class="size-10 text-gray-400 lg:absolute lg:-left-8 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2" />
                </button>
                <button on:click={() => rotateImageBy(1)}>
                    <Icon
                        icon="mingcute:right-line"
                        class="size-10 text-gray-400 lg:absolute lg:-right-8 lg:top-1/2 lg:-translate-y-1/2 lg:translate-x-1/2" />
                </button>
            </div>
        </div>
        <ol class="row-start-1 mt-4 flex md:mb-4 lg:col-span-2 lg:row-start-auto lg:mb-0">
            {#each columnsArray as _, colIdx}
                <div class="flex flex-col">
                    {#each images as img, imgIdx}
                        {#if imgIdx % columns === colIdx}
                            <li>
                                <button
                                    class="group h-full w-full p-1 md:p-2"
                                    on:click={() => (clickedSelectedImage = img)}
                                    on:mousemove={() => (selectedImage = img)}
                                    on:mouseleave={() => (selectedImage = clickedSelectedImage)}>
                                    <img
                                        alt={img.title}
                                        src={img.url}
                                        class={classNames(
                                            img === selectedImage && "ring-4",
                                            "ring-primary-600 w-full rounded shadow-md md:rounded-lg",
                                        )} />
                                </button>
                            </li>
                        {/if}
                    {/each}
                </div>
            {/each}
        </ol>
    </div>
</PageContent>
