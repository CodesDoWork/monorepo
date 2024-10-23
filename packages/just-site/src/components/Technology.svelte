<script lang="ts">
    import { useTechIcon } from "../stores/useTechIcon";
    import Label from "./Label.svelte";

    let className = "";
    export { className as class };
    export let technology: string;
    export let tag: string | undefined = undefined;

    const techIcon = useTechIcon(technology);
</script>

<Label class={className} icon={$techIcon} name={technology} {tag} />
