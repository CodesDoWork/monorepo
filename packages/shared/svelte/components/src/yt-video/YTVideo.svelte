<script lang="ts">
    import type { HTMLIframeAttributes } from "svelte/elements";
    import type { YTEmbeddedVideo } from "./types";

    interface Props extends HTMLIframeAttributes {
        video: YTEmbeddedVideo;
    }

    const { video, ...props }: Props = $props();
    const {
        allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share",
        referrerpolicy = "strict-origin-when-cross-origin",
        allowfullscreen = true,
    } = $derived(props);
</script>

<iframe
    src="https://www.youtube-nocookie.com/embed/{video.id}"
    title={video.title}
    {...props}
    {allow}
    {referrerpolicy}
    {allowfullscreen}></iframe>
