<script>
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    let className = "";
    export { className as class };
</script>

<Heading tag="h3" class={classNames("text-2xl sm:text-3xl", className)}>
    <slot />
</Heading>
