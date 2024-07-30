<script lang="ts">

    export let text = "";
    export let typingMs = 67;
    export let typeWords = false;
    export let onAnimationDone = () => {
    };

    let typedText = "";
    $: words = text.split(" ");
    $: length = typeWords ? words.length : text.length;

    let nextTypeIndex = 0;
    const typeText = () => {
        if (nextTypeIndex < length) {
            ++nextTypeIndex;
            typedText = typeWords ? words.slice(0, nextTypeIndex).join(" ") : text.slice(0, nextTypeIndex);
            setTimeout(typeText, typingMs);
        } else {
            typedText = typedText.trim();
            onAnimationDone();
        }
    };

    setTimeout(typeText, typingMs);
</script>

{typedText}
