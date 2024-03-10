<script lang="ts">
    import PostCard from "./PostCard.svelte";
    import type { PostOrPage } from "@tryghost/content-api";
    import { animationDelay } from "../helpers/animationDelay";

    export let posts: PostOrPage[];
</script>

<div class="grid gap-8 lg:grid-cols-2">
    <ul class="hidden lg:grid gap-8">
        {#each posts as post, idx (idx)}
            {#if idx % 2 === 0}
                <li><PostCard style={animationDelay(idx)} {post} /></li>
            {/if}
        {/each}
    </ul>
    <ul class="hidden lg:grid gap-8">
        {#each posts as post, idx (idx)}
            {#if idx % 2 === 1}
                <li><PostCard style={animationDelay(idx)} {post} /></li>
            {/if}
        {/each}
    </ul>
    <ul class="grid gap-8 lg:hidden">
        {#each posts as post, idx (idx)}
            <li><PostCard style={animationDelay(idx)} {post} /></li>
        {/each}
    </ul>
</div>
