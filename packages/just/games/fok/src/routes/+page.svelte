<script lang="ts">
    import { blur } from "svelte/transition";
    import bg1 from "../../assets/img/bg1.png";
    import bg2 from "../../assets/img/bg2.jpg";

    import Smoke from "../components/smoke.svelte";
    import Timer from "../components/timer.svelte";
    import "../../assets/css/tailwind.css";

    const bgs = [bg1, bg2];
    let currentBg = $state(0);

    const swapTime = 60_000;
    function switchBackground() {
        currentBg = (currentBg + 1) % bgs.length;
        setTimeout(switchBackground, swapTime);
    }
    setTimeout(switchBackground, swapTime);
</script>

<main class="font-serif">
    <div class="w-screen h-screen absolute bg-black -z-50"></div>
    <div class="h-screen w-full absolute -z-20">
        {#key currentBg}
            <img
                in:blur={{ duration: 3000 }}
                out:blur={{ duration: 3000 }}
                class="size-full absolute object-cover"
                src={bgs[currentBg]}
                alt="BG" />
        {/key}
    </div>
    <div class="h-screen w-full absolute -z-10 bg-black opacity-50">
        <Smoke />
    </div>
    <div>
        <h1 class="text-amber-500 text-5xl mx-auto text-center pt-16 drop-shadow-lg">
            The Fall of Kingdoms
        </h1>
    </div>
    <Timer />
</main>
