<script lang="ts">
    export let href: string;
    export let title: string;
    export let external = false;
</script>

<a href={href} rel={external ? "noopener" : undefined} target={external ? "_blank" : undefined} title={title}>
    <slot />
</a>
