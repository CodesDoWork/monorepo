<script lang="ts">
    import type { PageData } from "./$types";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { addJsonLdThings } from "@cdw/monorepo/shared-svelte-contexts";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { WidthBox } from "../../components/content-area";
    import { H1 } from "../../components/heading";
    import { ImagePopup } from "../../components/image-popup";
    import { ImageInfo, ImageNavigation } from "../../components/impressions";
    import ImageGallery from "../../components/impressions/ImageGallery.svelte";
    import { fadeIn } from "../../lib/common/styles";
    import { useImages } from "./image.svelte";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { impressions, jsonldThings } = $derived(data);
    const columns = 6;
    const imgs = $derived(useImages(impressions.images, columns));

    $effect(() => addJsonLdThings(jsonldThings));
</script>

<svelte:window onkeydown={imgs.handleKey} />
<ImagePopup
    isOpen={imgs.showDialog}
    setIsOpen={(isOpen: boolean) => (imgs.showDialog = isOpen)}
    selectedImage={imgs.selectedImage} />
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
                onclick={() => (imgs.showDialog = true)}
                class="
                    h-96 w-full
                    md:h-128
                ">
                <DirectusImage
                    img={imgs.selectedImage}
                    imgClass="rounded-md md:shadow-lg"
                    class="
                        mx-auto h-full cursor-pointer
                        lg:w-full
                    " />
            </button>
            <ImageInfo {...imgs.selectedImage} />
            <ImageNavigation rotateImageBy={imgs.rotateImageBy} />
        </div>
        <ImageGallery
            {columns}
            {...imgs}
            animationDelay={2}
            setClickedSelectedImageIdx={val => (imgs.clickedSelectedImageIdx = val)}
            setSelectedImageIdx={val => (imgs.selectedImageIdx = val)} />
    </div>
</WidthBox>
