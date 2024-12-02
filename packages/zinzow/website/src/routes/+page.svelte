<script lang="ts">
    import type { PageData } from "./$types";

    export let data: PageData;
    const { heroImage } = data;
</script>

<img src={heroImage} class="w-24" alt="Hero" />
