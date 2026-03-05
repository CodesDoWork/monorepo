<script lang="ts">
    import type { PageData } from "./$types";
    import { DirectusImage, YTVideo } from "@cdw/monorepo/shared-svelte-components";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { getLocalStorageState } from "@cdw/monorepo/shared-svelte-states";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ImagePopup } from "../../components/image-popup";
    import { ImageInfo, ImageNavigation } from "../../components/impressions";
    import ImageGallery from "../../components/impressions/ImageGallery.svelte";
    import { fadeIn, stylesMap } from "../../lib/common/styles";
    import { isImage, useGallery } from "./gallery.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { impressions, videos, jsonldThings } = $derived(data);
    const { allowYTPrompt, disableTPrompt } = $derived(impressions);
    const columns = 6;
    const gallery = $derived(useGallery(impressions.images, videos, columns));

    const isYTAllowed = getLocalStorageState("isYTAllowed", false);
    function onClickYTEnable(event: MouseEvent) {
        if (!(event.target instanceof HTMLAnchorElement)) {
            isYTAllowed.value = true;
        }
    }

    $effect(() => addJsonLdThings(jsonldThings));

    const largeImgClass = clsx(`
        relative h-96 w-full
        md:h-128
    `);
    const imgClass = clsx(`
        rounded-md
        md:shadow-lg
    `);
    const itemClass = clsx(`
        mx-auto h-full cursor-pointer
        lg:w-full
    `);
</script>

<svelte:window onkeydown={gallery.handleKey} />
{#if isImage(gallery.selectedItem)}
    <ImagePopup
        isOpen={gallery.showDialog}
        setIsOpen={(isOpen: boolean) => (gallery.showDialog = isOpen)}
        selectedImage={gallery.selectedItem} />
{/if}
<WidthBox class="isolate">
    <H1 class={fadeIn}>{impressions.title}</H1>
    <div
        class="
            mt-8 grid grid-cols-1
            lg:grid-cols-[60%_40%]
        ">
        <div
            style={animationDelay(1)}
            class={clsx(
                fadeIn,
                `
                    relative row-span-3 grid grid-cols-subgrid
                    lg:col-span-2 lg:row-span-2 lg:mx-8
                    xl:mx-4
                    2xl:mx-0
                `,
            )}>
            {#if isImage(gallery.selectedItem)}
                <button
                    onclick={() => (gallery.showDialog = isImage(gallery.selectedItem))}
                    class={largeImgClass}>
                    <DirectusImage img={gallery.selectedItem} {imgClass} class={itemClass} />
                </button>
            {:else if gallery.selectedItem}
                <div class={largeImgClass}>
                    {#if isYTAllowed.value}
                        <YTVideo video={gallery.selectedItem} class={clsx(itemClass, imgClass)} />
                    {:else}
                        <div
                            class="
                                absolute inset-0 z-10 flex items-center justify-center rounded-md
                                backdrop-brightness-50
                            ">
                            <button class={stylesMap.button} onclick={onClickYTEnable}>
                                {@html allowYTPrompt}
                            </button>
                        </div>
                        <DirectusImage
                            class={itemClass}
                            {imgClass}
                            img={gallery.selectedItem.thumbnail} />
                    {/if}
                </div>
            {/if}
            <ImageInfo {...gallery.selectedItem} />
            <ImageNavigation rotateCol={gallery.rotateCol} />
        </div>
        <ImageGallery {columns} {...gallery} animationDelay={2} />
        {#if isYTAllowed.value}
            <button
                class={clsx(stylesMap.button, "mt-4 w-fit")}
                onclick={() => (isYTAllowed.value = false)}>
                {disableTPrompt}
            </button>
        {/if}
    </div>
</WidthBox>
