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
                text-error-light
                dark:text-error-dark
            ">
            {error}
        </p>
    {/each}
{/if}
