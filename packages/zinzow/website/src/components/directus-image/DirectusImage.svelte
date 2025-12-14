<script lang="ts" generics="IN extends ImgTransitionKey, OUT extends ImgTransitionKey">
    import type {
        ImgTransitionKey,
        TransitionDef,
    } from "@cdw/monorepo/shared-utils/svelte/transitions/types";
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { clsx } from "clsx";

    interface Props {
        img: DirectusImageParams;
        id?: string;
        class?: string;
        imgClass?: string;
        sourceClass?: string;
        style?: string;
        imgStyle?: string;
        inTransition?: TransitionDef<IN>;
        outTransition?: TransitionDef<OUT>;
        onmousedown?: (event: MouseEvent) => void;
    }

    const {
        img,
        id,
        class: className,
        imgClass,
        sourceClass,
        style,
        imgStyle,
        inTransition,
        outTransition,
        onmousedown,
    }: Props = $props();

    const noTransition = (): null => null;
    const inFn = $derived(inTransition?.fn ?? noTransition);
    const inParams = $derived(inTransition?.params);
    const outFn = $derived(outTransition?.fn ?? noTransition);
    const outParams = $derived(outTransition?.params);
</script>

<div {id} class={clsx(className, "relative")} {style}>
    <img
        style={imgStyle}
        {...img}
        {onmousedown}
        class={clsx(imgClass, "size-full object-cover object-center")}
        in:inFn={inParams}
        out:outFn={outParams} />
    {#if img.source}
        <span
            class={clsx(
                sourceClass,
                `
                    absolute right-1 bottom-1 max-w-[calc(100%-0.5rem)] rounded-md bg-black/50 px-1
                    py-0.5 text-center text-[0.5rem] text-gray-200
                    md:text-[0.625rem]
                `,
            )}>
            {img.source}
        </span>
    {/if}
</div>
