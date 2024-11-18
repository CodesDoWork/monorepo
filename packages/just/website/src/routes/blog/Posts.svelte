<script lang="ts">
    import { animationDelay } from "../../helpers/animationDelay";
    import type { JustSiteBlogEntriesDto } from "../../types/dtos";
    import PostCard from "./PostCard.svelte";

    export let posts: JustSiteBlogEntriesDto[];
    export let startWithIdx = 0;
</script>

<div class="grid gap-8 lg:grid-cols-2">
    <ul class="hidden gap-8 lg:grid">
        {#each posts as post, idx (idx)}
            {#if idx % 2 === 0}
                <li>
                    <PostCard style={animationDelay(idx + startWithIdx)} {post} />
                </li>
            {/if}
        {/each}
    </ul>
    <ul class="hidden gap-8 lg:grid">
        {#each posts as post, idx (idx)}
            {#if idx % 2 === 1}
                <li>
                    <PostCard style={animationDelay(idx + startWithIdx)} {post} />
                </li>
            {/if}
        {/each}
    </ul>
    <ul class="grid gap-8 lg:hidden">
        {#each posts as post, idx (idx)}
            <li>
                <PostCard style={animationDelay(idx + startWithIdx)} {post} />
            </li>
        {/each}
    </ul>
</div>
