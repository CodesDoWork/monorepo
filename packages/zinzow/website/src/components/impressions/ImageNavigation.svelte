<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        rotateImageBy: (amount: number) => void;
    }

    const { rotateImageBy }: Props = $props();

    const iconClass = clsx(`
        size-10 cursor-pointer text-gray-500 drop-shadow-md transition-all
        hover:scale-115 hover:text-gray-400 hover:drop-shadow-lg
        active:scale-85 active:text-gray-800 active:drop-shadow-sm
        lg:absolute lg:top-1/2
    `);
</script>

<div
    class="
        row-start-2 mt-4 mb-8 flex items-center justify-center gap-12
        lg:m-0
    ">
    <button onclick={() => rotateImageBy(-1)}>
        <Icon
            icon="mingcute:left-line"
            class={clsx(iconClass, "lg:-left-8 lg:-translate-x-1/2 lg:-translate-y-1/2")} />
    </button>
    <button onclick={() => rotateImageBy(1)}>
        <Icon
            icon="mingcute:right-line"
            class={clsx(iconClass, "lg:-right-8 lg:translate-x-1/2 lg:-translate-y-1/2")} />
    </button>
</div>
