<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { clsx } from "clsx";
    import { animationDelay, fadeInBottom } from "../../lib/client/animate";
    import { DirectusImage } from "../directus-image";

    interface Props {
        img: DirectusImageParams;
        class?: string;
        animationDelay: number;
    }

    const { img, class: className, animationDelay: delay }: Props = $props();
</script>

<div class={fadeInBottom("relative")} style={animationDelay(delay)}>
    <DirectusImage
        {img}
        imgClass="rounded-xl shadow-lg"
        class={clsx("aspect-2/3 w-full", className)} />
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset">
    </div>
</div>
