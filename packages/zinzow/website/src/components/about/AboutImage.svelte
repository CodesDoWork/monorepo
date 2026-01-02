<script lang="ts">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { fadeInBottom } from "../../lib/common/styles";

    interface Props {
        img: DirectusImageParams;
        class?: string;
        animationDelay: number;
    }

    const { img, class: className, animationDelay: delay }: Props = $props();
</script>

<div class={clsx(fadeInBottom, "relative")} style={animationDelay(delay)}>
    <DirectusImage
        {img}
        imgClass="rounded-xl shadow-lg"
        class={clsx("aspect-2/3 w-full", className)} />
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset">
    </div>
</div>
