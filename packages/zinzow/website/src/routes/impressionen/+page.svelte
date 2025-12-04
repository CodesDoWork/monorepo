<script lang="ts">
    import type { PageData } from "./$types";
    import { byId } from "@cdw/monorepo/shared-utils/filters";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { writable } from "svelte/store";
    import { Badges } from "../../components/badge";
    import { PageContent } from "../../components/content-area";
    import { DirectusImage } from "../../components/directus-image";
    import { H1, H3 } from "../../components/heading";
    import { Icons } from "../../components/icons";
    import { ImagePopup } from "../../components/image-popup";
    import { Paragraphs, TextWithIcon } from "../../components/text";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { images, columns } = data.impressions;

    let selectedImage = $state(images[0]);
    let clickedSelectedImage = $state(selectedImage);
    const showDialog = writable(false);
    const columnsArray = Array.from({ length: columns });

    function rotateImageBy(steps: number) {
        let idx = images.findIndex(byId(selectedImage.id)) + steps;
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
</script>

<svelte:window onkeydown={handleKey} />
<ImagePopup isOpen={showDialog} {selectedImage} />
<PageContent class="isolate">
    <H1>{data.texts.title}</H1>
    <div
        class="
            mt-8 grid grid-cols-1
            lg:grid-cols-[60%_40%]
        ">
        <div
            class="
                relative row-span-3 grid grid-cols-subgrid
                lg:col-span-2 lg:row-span-2 lg:mx-8
                xl:mx-4
                2xl:mx-0
            ">
            <button
                onclick={() => showDialog.set(true)}
                class="
                    h-96 w-full
                    md:h-128
                ">
                <DirectusImage
                    img={selectedImage}
                    class="
                        mx-auto h-full
                        md:rounded-lg md:shadow-lg
                        lg:w-full lg:object-cover
                    " />
            </button>
            <div
                class="
                    p-0
                    lg:row-start-auto lg:h-auto lg:p-6
                ">
                <H3>{selectedImage.title}</H3>
                {#if selectedImage.description}
                    <Paragraphs text={selectedImage.description} size="base" class="mt-4" />
                {/if}
                {#if selectedImage.location}
                    <TextWithIcon icon={Icons.Location} class="mt-8">
                        {selectedImage.location}
                    </TextWithIcon>
                {/if}
                {#if selectedImage.tags}
                    <Badges class="mt-6" badges={selectedImage.tags} />
                {/if}
            </div>
            <div
                class="
                    row-start-2 mt-4 mb-8 flex items-center justify-center gap-12
                    lg:m-0
                ">
                <button onclick={() => rotateImageBy(-1)}>
                    <Icon
                        icon="mingcute:left-line"
                        class="
                            size-10 text-gray-400
                            lg:absolute lg:top-1/2 lg:-left-8 lg:-translate-x-1/2
                            lg:-translate-y-1/2
                        " />
                </button>
                <button onclick={() => rotateImageBy(1)}>
                    <Icon
                        icon="mingcute:right-line"
                        class="
                            size-10 text-gray-400
                            lg:absolute lg:top-1/2 lg:-right-8 lg:translate-x-1/2
                            lg:-translate-y-1/2
                        " />
                </button>
            </div>
        </div>
        <ol
            class="
                row-start-1 mt-4 flex
                md:mb-4
                lg:col-span-2 lg:row-start-auto lg:mb-0
            ">
            {#each columnsArray as _, colIdx}
                <div class="flex flex-col">
                    {#each images as img, imgIdx}
                        {#if imgIdx % columns === colIdx}
                            <li>
                                <button
                                    class="
                                        group h-full w-full p-1
                                        md:p-2
                                    "
                                    onclick={() => (clickedSelectedImage = img)}
                                    onmousemove={() => (selectedImage = img)}
                                    onmouseleave={() => (selectedImage = clickedSelectedImage)}>
                                    <DirectusImage
                                        {img}
                                        class={clsx(
                                            img.id === selectedImage.id && "ring-4",
                                            `
                                                w-full rounded shadow-md ring-(--primary)
                                                md:rounded-lg
                                            `,
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
