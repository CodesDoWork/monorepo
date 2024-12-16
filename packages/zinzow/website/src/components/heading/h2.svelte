<script>
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    let className = "";
    export { className as class };
</script>

<Heading tag="h2" class={classNames("text-3xl sm:text-4xl", className)}>
    <slot />
</Heading>
