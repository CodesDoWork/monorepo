<script lang="ts">
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

    const pauseAllOtherAudios = $derived(() => {
        const audios = document.getElementsByTagName("audio");
        for (let i = 0; i < audios.length; ++i) {
            if (audios[i] !== audioRef) {
                audios[i]?.pause();
            }
        }
    });

    $effect(() => {
        if (audioRef) {
            audioRef.addEventListener("play", pauseAllOtherAudios);
            audioRef.play();
        }
    });
</script>

{#if showAudio}
    <div
        class="
            w-32
            md:w-56
            xl:w-auto
        ">
        <audio
            onclick={e => e.stopPropagation()}
            bind:this={audioRef}
            class="
                -ml-5 scale-80 rounded-full
                md:-ml-8
                xl:ml-0 xl:h-8 xl:w-full xl:scale-100
            "
            controls>
            <source src={`/api/getAudio/${storeFile}`} type="audio/mpeg" />
            Audio not supported
        </audio>
    </div>
{:else}
    <button {onclick} class="group size-fit cursor-pointer p-1">
        <span
            class="
                icon-[zondicons--play-outline] size-5 drop-shadow-md drop-shadow-black/30
                transition-transform
                group-hover:scale-107 group-hover:drop-shadow-lg group-hover:drop-shadow-black/30
                dark:drop-shadow-black
                dark:group-hover:drop-shadow-black
            "></span>
    </button>
{/if}
