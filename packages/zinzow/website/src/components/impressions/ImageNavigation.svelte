<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        rotateCol: (forwards: boolean) => void;
    }

    const { rotateCol }: Props = $props();

    const iconClass = clsx(`
        size-10 cursor-pointer text-gray-500 drop-shadow-md transition-all
        hover:scale-110 hover:text-gray-400 hover:drop-shadow-lg
        active:scale-95 active:text-gray-600 active:drop-shadow-sm
        lg:absolute lg:top-1/2
    `);
</script>

<div
    class="
        row-start-2 mt-4 mb-8 flex items-center justify-center gap-12
        lg:m-0
    ">
    <button onclick={() => rotateCol(false)}>
        <span class={clsx(iconClass, `
            icon-[mingcute--left-line]
            lg:-left-8 lg:-translate-1/2
        `)}></span>
    </button>
    <button onclick={() => rotateCol(true)}>
        <span
            class={clsx(iconClass, `
                icon-[mingcute--right-line]
                lg:-right-8 lg:translate-x-1/2 lg:-translate-y-1/2
            `)}></span>
    </button>
</div>
