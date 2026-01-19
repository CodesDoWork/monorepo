<script lang="ts">
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";

    interface Props {
        icon: string;
        iconClass?: string;
        messages: string[];
    }

    const { icon, iconClass, messages }: Props = $props();
</script>

{#if messages.length}
    <div class="group relative">
        <Icon {icon} class={clsx("size-6", iconClass)} />
        <ul
            class="
                dark:bg-primary-900/50
                bg-primary/50 invisible absolute top-full right-0 flex list-disc flex-col gap-2
                rounded-sm py-2 pr-3 pl-6 opacity-0 transition-all
                group-hover:visible group-hover:opacity-100
            ">
            {#each messages as message}
                <li class="text-sm text-nowrap">{@html message}</li>
            {/each}
        </ul>
    </div>
{/if}
