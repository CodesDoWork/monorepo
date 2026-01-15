<script lang="ts">
    import type { ComponentProps } from "svelte";
    import { clsx } from "clsx";
    import Input from "./Input.svelte";
    import { buttonClass } from "./styles";

    interface Props extends Omit<ComponentProps<typeof Input>, "type"> {
        chooseText: string;
        fileChosenText: string;
        filesChosenText: string;
        dropFilesText: string;
    }

    const {
        class: className,
        chooseText,
        fileChosenText,
        filesChosenText,
        dropFilesText,
        ...inputProps
    }: Props = $props();

    let input: HTMLInputElement | undefined = $state(undefined);

    const onclick = () => {
        input?.click();
    };

    let selectedFiles: string[] = $state([]);
    let isDragOver = $state(false);
    const displayText = $derived.by(() => {
        if (isDragOver) {
            return dropFilesText;
        }

        const selectedFilesTextVariant =
            selectedFiles.length === 1 ? fileChosenText : filesChosenText;
        const selectedFilesText = `${selectedFiles.length} ${selectedFilesTextVariant}`;
        return selectedFiles.length ? selectedFilesText : chooseText;
    });

    const onDrop = $derived(function (e: DragEvent) {
        e.preventDefault();
        isDragOver = false;
        if (e.dataTransfer?.files) {
            input.files = e.dataTransfer.files;
            selectedFiles = Array.from(e.dataTransfer.files).map(f => f.name);
        }
        return false;
    });
</script>

<div class={className}>
    <div class="relative">
        <button
            ondrop={onDrop}
            ondragover={e => e.preventDefault()}
            ondragenter={() => (isDragOver = true)}
            ondragleave={() => (isDragOver = false)}
            type="button"
            {onclick}
            class={clsx(
                buttonClass,
                "absolute z-10 size-full",
                inputProps.errors?.length &&
                    `
                        outline outline-red-600
                        dark:outline-red-800
                    `,
                isDragOver && "bg-primary-400",
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
