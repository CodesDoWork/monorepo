<script lang="ts">
    import classNames from "classnames";
    import { Text } from "../text";

    type HeadingTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
    export let tag: HeadingTag;

    let className = "";
    export { className as class };
</script>

<Text
    {tag}
    class={classNames(
        "text-primary-600 dark:text-primary-600 text-pretty font-semibold tracking-tight",
        className,
    )}>
    <slot />
</Text>
