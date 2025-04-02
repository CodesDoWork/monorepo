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

    let animationDone = $state(false);

    const computedClass = $derived(
        clsx(
            "after:ml-2 after:opacity-50 after:content-['▌']",
            animationDone && blinkCursor && "after:animate-blink",
            animationDone && !blinkCursor && "after:!content-none",
            className,
        ),
    );

    let typedLength = $state(0);
    const typeText = $derived((text: string) => {
        if (typedLength < text.length) {
            ++typedLength;
            setTimeout(() => typeText(text), typingMs);
        } else {
            animationDone = true;
        }
    });

    $effect(() => {
        animationDone = false;
        typedLength = 0;
        text && setTimeout(() => typeText(text), typingMs);
    });
</script>

<span class={computedClass}>{text.substring(0, typedLength)}</span>
