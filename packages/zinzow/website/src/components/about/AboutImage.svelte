<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { DirectusImage } from "../directus-image";

    interface Props {
        img: DirectusImageParams;
    }

    const { img }: Props = $props();
</script>

<div class="relative">
    <DirectusImage
        {img}
        class="aspect-2/3 w-full rounded-xl bg-gray-900/5 object-cover shadow-lg" />
    <div class="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-gray-900/10 ring-inset">
    </div>
</div>
