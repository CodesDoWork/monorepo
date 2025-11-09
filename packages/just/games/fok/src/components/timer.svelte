<script lang="ts">
    import hourglass from "../../assets/img/hourglass.png";

    const startTime = 60;

    let time = $state(startTime);
    let rotation = $state(0);
    let rotationDuration = $state(0.67);
    let scheduledCountdown = $state<NodeJS.Timeout | null>(null);

    function countdown() {
        if (time > 0) {
            time -= 1;
            scheduledCountdown = setTimeout(countdown, 1_000);
        }
    }

    function clickHourglass() {
        if (scheduledCountdown) {
            clearTimeout(scheduledCountdown);
        }

        time = startTime + 1;
        rotation += 180;
        if (rotation === 360) {
            setTimeout(() => {
                rotation = 0;
                rotationDuration = 0;
                setTimeout(() => {
                    rotationDuration = 0.67;
                }, 50);
            }, rotationDuration * 1_000);
        }
        countdown();
    }
</script>

<p class="lg:mt-16 lg:-mb-24 mt-8 -mb-12 text-8xl text-red-500 mx-auto text-center drop-shadow-lg">
    {Math.floor(time / 60)}:{(time % 60).toString().padStart(2, "0")}
</p>
<div class="relative">
    <img
        class="w-4/5 max-w-lg mx-auto drop-shadow-lg"
        src={hourglass}
        alt="Hourglass"
        style="transform: rotate({rotation}deg); transition: transform {rotationDuration}s;"
        onclick={clickHourglass} />
</div>
