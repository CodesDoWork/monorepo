<script lang="ts">
    import type { PageData } from "./$types";
    import { DirectusImage, YTVideo } from "@cdw/monorepo/shared-svelte-components";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ImagePopup } from "../../components/image-popup";
    import { ImageInfo, ImageNavigation } from "../../components/impressions";
    import ImageGallery from "../../components/impressions/ImageGallery.svelte";
    import { fadeIn } from "../../lib/common/styles";
    import { isVideo, useGallery } from "./gallery.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { impressions, videos, jsonldThings } = $derived(data);
    const columns = 6;
    const gallery = $derived(useGallery(impressions.images, videos, columns));

    $effect(() => addJsonLdThings(jsonldThings));

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
{#if !isVideo(gallery.selectedItem)}
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
            <button
                onclick={() => (gallery.showDialog = true)}
                class="
                    h-96 w-full
                    md:h-128
                ">
                {#if isVideo(gallery.selectedItem)}
                    <YTVideo video={gallery.selectedItem} class={clsx(itemClass, imgClass)} />
                {:else if gallery.selectedItem}
                    <DirectusImage img={gallery.selectedItem} {imgClass} class={itemClass} />
                {/if}
            </button>
            <ImageInfo {...gallery.selectedItem} />
            <ImageNavigation rotateCol={gallery.rotateCol} />
        </div>
        <ImageGallery {columns} {...gallery} animationDelay={2} />
    </div>
</WidthBox>
