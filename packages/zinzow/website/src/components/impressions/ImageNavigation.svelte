<script lang="ts">
    import Icon from "@iconify/svelte";

    interface Props {
        rotateImageBy: (amount: number) => void;
    }

    const { rotateImageBy }: Props = $props();
</script>

<div
    class="
        row-start-2 mt-4 mb-8 flex items-center justify-center gap-12
        lg:m-0
    ">
    <button onclick={() => rotateImageBy(-1)}>
        <Icon
            icon="mingcute:left-line"
            class="
                size-10 text-gray-400
                lg:absolute lg:top-1/2 lg:-left-8 lg:-translate-x-1/2 lg:-translate-y-1/2
            " />
    </button>
    <button onclick={() => rotateImageBy(1)}>
        <Icon
            icon="mingcute:right-line"
            class="
                size-10 text-gray-400
                lg:absolute lg:top-1/2 lg:-right-8 lg:translate-x-1/2 lg:-translate-y-1/2
            " />
    </button>
</div>
