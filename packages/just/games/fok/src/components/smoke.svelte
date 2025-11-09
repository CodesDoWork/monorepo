<script>
    import { onMount } from "svelte";

    let canvas;
    let ctx;
    let w, h;
    const smokeCount = 30;
    const particles = [];

    // Simple pseudo-Perlin noise function
    function noise(x, y, t) {
        return Math.sin(x * 0.02 + t * 0.01) * Math.cos(y * 0.02 + t * 0.015);
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
        resize();
        window.addEventListener("resize", resize);

        for (let i = 0; i < smokeCount; i++) {
            particles.push({
                x: Math.random() * w,
                y: Math.random() * h,
                size: 80 + Math.random() * 120,
                opacity: 0.05 + Math.random() * 0.15,
                offset: Math.random() * 1000,
            });
        }

        let time = 0;
        function draw() {
            ctx.clearRect(0, 0, w, h);
            ctx.globalCompositeOperation = "lighter";

            for (const p of particles) {
                const n = noise(p.x * 0.4, p.y * 0.4, time + p.offset);
                p.y -= 0.5 + n * 0.5;
                p.x += n * 0.8;

                if (p.y + p.size < 0) {
                    p.y = h + p.size;
                }
                if (p.x < -200) {
                    p.x = w + 200;
                }
                if (p.x > w + 200) {
                    p.x = -200;
                }

                const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                grad.addColorStop(0, `rgba(130,180,255,${p.opacity})`);
                grad.addColorStop(0.5, `rgba(80,120,200,${p.opacity * 0.6})`);
                grad.addColorStop(1, "rgba(0,0,40,0)");
                ctx.fillStyle = grad;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fill();
            }

            time += 0.8;
            requestAnimationFrame(draw);
        }

        draw();
    });

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
    }
</script>

<canvas bind:this={canvas} class="genius-smoke"></canvas>

<style>
    .genius-smoke {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(8px);
        mix-blend-mode: screen;
        pointer-events: none;
        background: radial-gradient(ellipse at bottom, #081028 0%, #000010 100%);
    }
</style>
