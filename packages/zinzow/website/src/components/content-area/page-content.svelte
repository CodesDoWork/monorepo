<script lang="ts">
    import classNames from "classnames";
    import { WidthBox } from ".";

    let className = "";
    export { className as class };
    export let tag: keyof HTMLElementTagNameMap = "div";
</script>

<WidthBox {tag} class={classNames("py-16 lg:py-24", className)}>
    <slot />
</WidthBox>
