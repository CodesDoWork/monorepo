<script lang="ts">
    import { enhance } from "$app/forms";
    import { Input, Textarea } from "@cdw/monorepo/shared-svelte-components/forms";
    import { clsx } from "clsx";
    import { BackButton } from "../../components/buttons";
    import { H1 } from "../../components/texts";
    import { buttonClass } from "../../lib/common/styles";
</script>

<BackButton />
<H1>Downloader</H1>

<div>
    <form use:enhance action="?/download" method="POST">
        <Input placeholder="URL" name="url" />
        <button class={clsx(buttonClass, "mt-4 justify-self-start")}>Download</button>
    </form>
    <Textarea readonly value="" class="mt-16 resize-none" rows={18} />
</div>
