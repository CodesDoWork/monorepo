<script lang="ts">
    import { LinkButton } from "@cdw/monorepo/shared-svelte-components/buttons";
</script>

<div>
    <LinkButton href="/download-addon.zip" download="download-addon.zip">Download Addon</LinkButton>
    <h2 class="text-secondary mt-12 mb-4 text-2xl font-bold">How to install the addon:</h2>
    <ol class="ml-4 list-decimal space-y-2">
        <li>
            Goto "<a
                href="about:debugging#/runtime/this-firefox"
                target="_blank"
                rel="noopener noreferrer">
                <code>about:debugging#/runtime/this-firefox</code>
            </a>".
        </li>
        <li>Click "<code>Load Toemporary Add-on...</code>".</li>
        <li>Select the downloaded zip file.</li>
        <li>Have fun downloading music!</li>
    </ol>
</div>
