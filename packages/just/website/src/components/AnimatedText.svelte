<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        class?: string;
        text?: string;
        typingMs?: number;
        typeWords?: boolean;
        blinkCursor?: boolean;
    }

    const {
        class: className = "",
        text = "",
        typingMs = 67,
        typeWords = false,
        blinkCursor = false,
    }: Props = $props();

    let animationDone = $state(false);

    const computedClass = $derived(clsx(
        "after:ml-2 after:opacity-50 after:content-['▌']",
        animationDone && blinkCursor && "after:animate-blink",
        animationDone && !blinkCursor && "after:!content-none",
        className,
    ));

    let typedText = $state("");
    const words = $derived(text.split(" "));
    const length = $derived(typeWords ? words.length : text.length);

    let nextTypeIndex = 0;
    const typeText = () => {
        if (nextTypeIndex < length) {
            ++nextTypeIndex;
            typedText = typeWords
                ? words.slice(0, nextTypeIndex).join(" ")
                : text.slice(0, nextTypeIndex);
            setTimeout(typeText, typingMs);
        } else {
            typedText = typedText.trim();
            animationDone = true;
        }
    };

    setTimeout(typeText, typingMs);
</script>

<span class={computedClass}>{typedText}</span>
