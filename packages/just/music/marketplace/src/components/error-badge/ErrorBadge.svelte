<script lang="ts">
    import { clsx } from "clsx";

    interface Props {
        icon: string;
        iconClass?: string;
        messages: string[];
    }

    const { icon, iconClass, messages }: Props = $props();
    let showMessages = $state(false);
    let buttonRef = $state<HTMLButtonElement | undefined>();

    function onWindowClick(e: MouseEvent) {
        if (!buttonRef) {
            return;
        }

        const rect = buttonRef.getBoundingClientRect();
        const { x, y } = e;
        if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
            showMessages = false;
        }
    }
</script>

<svelte:window onclick={onWindowClick} />

{#if messages.length}
    <button
        bind:this={buttonRef}
        class="group relative p-0.5"
        onclick={() => (showMessages = !showMessages)}>
        <span class={clsx("size-6", icon, iconClass)}></span>
        <ul
            class={clsx(
                `
                    dark:bg-primary-900/50
                    bg-primary/50 invisible absolute top-full right-0 flex list-disc flex-col gap-2
                    rounded-sm py-2 pr-3 pl-6 opacity-0 transition-all
                    group-hover:visible group-hover:opacity-100
                `,
                showMessages && "visible opacity-100",
            )}>
            {#each messages as message}
                <li class="text-sm text-nowrap">{@html message}</li>
            {/each}
        </ul>
    </button>
{/if}
