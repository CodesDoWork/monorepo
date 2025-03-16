<script lang="ts">
    import { useTechIcon } from "../stores/useTechIcon";
    import Label from "./Label.svelte";

    interface Props {
        class?: string;
        technology: string;
        tag?: string | null;
    }

    const { class: className = "", technology, tag = null }: Props = $props();

    const techIcon = useTechIcon(technology);
</script>

<Label class={className} icon={$techIcon} name={technology} {tag} />
