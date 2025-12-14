<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { clsx } from "clsx";
    import { DirectusImage } from "../directus-image";

    interface Props {
        columns: number;
        columnsArray: DirectusImageParams[][];
        images: DirectusImageParams[];
        selectedImageIdx: number;
        resetSelectedImg: () => void;
        setSelectedImageIdx: (idx: number) => void;
        setClickedSelectedImageIdx: (idx: number) => void;
    }

    const {
        images,
        columns,
        columnsArray,
        selectedImageIdx,
        resetSelectedImg,
        setSelectedImageIdx,
        setClickedSelectedImageIdx,
    }: Props = $props();
</script>

<ul
    class="
        row-start-1 mt-4 mb-2 grid grid-cols-6
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
                            onclick={() => setClickedSelectedImageIdx(imgIdx)}
                            onmousemove={() => setSelectedImageIdx(imgIdx)}
                            onmouseleave={resetSelectedImg}>
                            <DirectusImage
                                {img}
                                imgClass={clsx(
                                    `
                                        rounded-md shadow-md ring-(--primary)
                                        sm:max-h-24
                                        md:max-h-36 md:rounded-lg
                                        lg:max-h-40
                                    `,
                                    imgIdx === selectedImageIdx &&
                                        `
                                            ring-2
                                            md:ring-4
                                        `,
                                )}
                                sourceClass={clsx(`
                                    hidden
                                    md:block
                                `)}
                                class={clsx("w-full cursor-pointer")} />
                        </button>
                    </li>
                {/if}
            {/each}
        </div>
    {/each}
</ul>
