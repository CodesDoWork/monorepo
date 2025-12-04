<script lang="ts" generics="IN extends ImgTransitionKey, OUT extends ImgTransitionKey">
    import type {
        ImgTransitionKey,
        TransitionDef,
    } from "@cdw/monorepo/shared-utils/svelte/transitions/types";
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { clsx } from "clsx";

    interface Props {
        img: DirectusImageParams;
        class?: string;
        style?: string;
        inTransition?: TransitionDef<IN>;
        outTransition?: TransitionDef<OUT>;
        onmousedown?: (event: MouseEvent) => void;
    }

    const {
        class: className,
        style,
        img,
        inTransition,
        outTransition,
        onmousedown,
    }: Props = $props();
    const inFn = inTransition?.fn;
    const inParams = inTransition?.params;
    const outFn = outTransition?.fn;
    const outParams = outTransition?.params;
</script>

<img
    {style}
    {...img}
    {onmousedown}
    class={clsx(className, "object-cover object-center")}
    in:inFn={inParams}
    out:outFn={outParams} />
