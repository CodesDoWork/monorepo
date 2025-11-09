<script>
    import { onMount } from "svelte";

    let canvas;
    let ctx;
    let img;

    const sandParticles = [];
    const particleCount = 800; // more particles = smoother sand
    const gravity = 0.5;

    let topMask = [];
    let bottomMask = [];

    // Spawn particles randomly in top mask
    function initParticles() {
        for (let i = 0; i < particleCount; i++) {
            const idx = Math.floor(Math.random() * topMask.length);
            const pos = topMask[idx];
            sandParticles.push({ x: pos.x, y: pos.y, vy: 0 });
        }
    }

    // Move particles down, accumulate at bottom
    function updateParticles() {
        for (let p of sandParticles) {
            p.vy += gravity;
            let newY = p.y + p.vy;

            // Find if below is inside mask
            const idx = bottomMask.find(
                pos => pos.x === Math.round(p.x) && pos.y === Math.round(newY),
            );
            if (idx || newY >= canvas.height) {
                p.vy = 0; // stop falling
            } else {
                p.y = newY;
            }
        }
    }

    // Draw sand
    function drawParticles() {
        ctx.fillStyle = "goldenrod";
        for (let p of sandParticles) {
            ctx.fillRect(p.x, p.y, 2, 2);
        }
    }

    // Main animation
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        updateParticles();
        drawParticles();
        requestAnimationFrame(animate);
    }

    onMount(() => {
        ctx = canvas.getContext("2d");
        img = document.getElementById("hourglassImg");

        canvas.width = 300;
        canvas.height = 400;

        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);

        // Create top and bottom masks
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const alpha = imageData.data[(y * canvas.width + x) * 4 + 3];
                if (alpha === 0) {
                    // transparent area = inside hourglass
                    if (y < canvas.height / 2) topMask.push({ x, y });
                    else bottomMask.push({ x, y });
                }
            }
        }

        initParticles();
        animate();
    });
</script>

<div class="hourglass-wrapper absolute">
    <img id="hourglassImg" src="/hourglass.png" alt="Hourglass" class="hidden" />
    <canvas bind:this={canvas}></canvas>
</div>
