<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        text?: string;
        typingMs?: number;
        blinkCursor?: boolean;
    }

    const {
        class: className = "",
        text = "",
        typingMs = 67,
        blinkCursor = false,
    }: Props = $props();

    let writingDone = $state(true);
    let deletionDone = $state(true);

    const computedClass = $derived(
        clsx(
            "after:ml-2 after:opacity-50 after:content-['▌']",
            writingDone && blinkCursor && "after:animate-blink",
            writingDone && !blinkCursor && "after:!content-none",
            className,
        ),
    );

    let currentText = $state("");

    const deleteText = $derived(() => {
        if (currentText.length > 0) {
            currentText = currentText.substring(0, currentText.length - 1);
            setTimeout(() => deleteText(), typingMs / 2);
        } else {
            deletionDone = true;
        }
    });

    const typeText = $derived(() => {
        if (!deletionDone) {
            return;
        }

        if (currentText.length < text.length) {
            currentText = text.substring(0, currentText.length + 1);
            setTimeout(() => typeText(), typingMs);
        } else {
            writingDone = true;
        }
    });

    $effect(() => {
        void text;
        deletionDone = false;
        setTimeout(() => deleteText(), typingMs / 2);
    });

    $effect(() => {
        if (deletionDone) {
            text && setTimeout(() => typeText(), typingMs);
        }
    });
</script>

<span class={computedClass}>{currentText}</span>
