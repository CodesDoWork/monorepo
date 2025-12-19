<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { clsx } from "clsx";
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

    let input: HTMLInputElement | undefined = $state(undefined);

    const onclick = () => {
        input?.click();
    };

    let selectedFiles: string[] = $state([]);

    const selectedFilesTextVariant = $derived(
        selectedFiles.length === 1 ? fileChosenText : filesChosenText,
    );
    const selectedFilesText = $derived(`${selectedFiles.length} ${selectedFilesTextVariant}`);
    const displayText = $derived(selectedFiles.length ? selectedFilesText : chooseText);
</script>

<div class={className}>
    <div class="relative">
        <button
            type="button"
            {onclick}
            class={clsx(
                stylesMap.button,
                "absolute z-10 size-full",
                inputProps.errors?.length &&
                    `
                        outline-error-light outline
                        dark:outline-error-dark
                    `,
            )}>
            {displayText}
        </button>
        <Input
            bind:input
            type="file"
            onchange={() => (selectedFiles = Array.from(input.files).map(f => f.name))}
            class="opacity-0"
            {...inputProps} />
    </div>
    {#if selectedFiles.length}
        <p>{selectedFiles.join(", ")}</p>
    {/if}
</div>
