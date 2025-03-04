<script lang="ts">
    import { clsx } from "clsx";

    let className = "";
    export { className as class };
    export let text = "";
    export let typingMs = 67;
    export let typeWords = false;
    export let blinkCursor = false;

    let animationDone = false;

    $: computedClass = clsx(
        "after:content-['▌'] after:ml-2 after:opacity-50",
        animationDone && blinkCursor && "after:animate-blink",
        animationDone && !blinkCursor && "after:!content-none",
        className,
    );

    let typedText = "";
    $: words = text.split(" ");
    $: length = typeWords ? words.length : text.length;

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
