<script lang="ts">
    import Icon from "@iconify/svelte";

    interface Props {
        storeFile: string;
    }

    const { storeFile }: Props = $props();
    let showAudio = $state(false);
    let audioRef = $state<HTMLAudioElement | undefined>();

    function onclick(event: MouseEvent) {
        event.stopPropagation();
        showAudio = true;
    }

    $effect(() => {
        audioRef?.play();
    });
</script>

<div>
    {#if showAudio}
        <audio bind:this={audioRef} class="h-8 w-full rounded-full" controls>
            <source src={`/api/getAudio/${storeFile}`} type="audio/mpeg" />
            Audio not supported
        </audio>
    {:else}
        <button {onclick} class="group size-fit cursor-pointer p-1">
            <Icon
                icon="zondicons:play-outline"
                class="
                    size-5 drop-shadow-md drop-shadow-black/30 transition-transform
                    group-hover:scale-107 group-hover:drop-shadow-lg
                    group-hover:drop-shadow-black/30
                    dark:drop-shadow-black
                    dark:group-hover:drop-shadow-black
                " />
        </button>
    {/if}
</div>
