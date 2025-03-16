<script>
    import classNames from "classnames";
    import Heading from "./heading.svelte";

    let className = "";
    export { className as class };
</script>

<Heading tag="h1" class={classNames("mb-6 text-4xl sm:text-5xl", className)}>
    <slot />
</Heading>
