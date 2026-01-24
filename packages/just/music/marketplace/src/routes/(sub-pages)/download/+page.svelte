<script lang="ts">
    import { buttonClass } from "../../../lib/common/styles";
</script>

<div class="pt-8">
    <a class={buttonClass} href="/download-addon.zip" download="download-addon.zip">
        Download Addon
    </a>
    <h2
        class="
            dark:text-secondary
            text-secondary-700 mt-12 mb-4 text-lg font-bold
            sm:text-xl
            md:text-2xl
        ">
        How to install the addon:
    </h2>
    <ol
        class="
            ml-4 list-decimal space-y-2 text-sm
            md:text-base
        ">
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
