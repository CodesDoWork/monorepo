<script lang="ts">
    interface Props {
        errors?: string[];
    }

    const { errors }: Props = $props();
</script>

{#if errors?.length}
    {#each errors as error}
        <p
            class="
                text-red-600
                dark:text-red-800
            ">
            {error}
        </p>
    {/each}
{/if}
