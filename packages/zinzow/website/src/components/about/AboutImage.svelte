<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { clsx } from "clsx";
    import { DirectusImage } from "../directus-image";

    interface Props {
        img: DirectusImageParams;
        class?: string;
    }

    const { img, class: className }: Props = $props();
</script>

<div class="relative">
    <DirectusImage
        {img}
        imgClass="rounded-xl shadow-lg"
        class={clsx("aspect-2/3 w-full", className)} />
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset">
    </div>
</div>
