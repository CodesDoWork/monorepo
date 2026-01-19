<script lang="ts">
    import { goto } from "$app/navigation";
    import Icon from "@iconify/svelte";
</script>

<button onclick={() => goto("/")}>
    <Icon icon="weui:back-filled" class="absolute top-4 left-4 size-6 cursor-pointer" />
</button>
