<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { clsx } from "clsx";
    import { onMount } from "svelte";
    import { stylesMap } from "../../lib/common/styles";
    import Input from "./Input.svelte";

    type Props = Omit<ComponentProps<typeof Input>, "type"> & {
        chooseText: string;
        fileChosenText: string;
        filesChosenText: string;
    };

    const {
        class: className,
        chooseText,
        fileChosenText,
        filesChosenText,
        ...inputProps
    }: Props = $props();
    const { id } = inputProps;

    const onclick = () => {
        const input = document.getElementById(id) as HTMLInputElement;
        input.click();
    };

    let selectedFiles: string[] = $state([]);
    onMount(() => {
        const input = document.getElementById(id) as HTMLInputElement;
        input.addEventListener("change", () => {
            selectedFiles = Array.from(input.files).map(f => f.name);
        });
    });

    const selectedFilesTextVariant = $derived(
        selectedFiles.length === 1 ? fileChosenText : filesChosenText,
    );
    const selectedFilesText = $derived(`${selectedFiles.length} ${selectedFilesTextVariant}`);
    const displayText = $derived(selectedFiles.length ? selectedFilesText : chooseText);
</script>

<div class={className}>
    <div class="relative">
        <button type="button" {onclick} class={clsx(stylesMap.button, "absolute z-10 size-full")}>
            {displayText}
        </button>
        <Input type="file" class="opacity-0" {...inputProps} />
    </div>
    {#if selectedFiles.length}
        <p>{selectedFiles.join(", ")}</p>
    {/if}
</div>
