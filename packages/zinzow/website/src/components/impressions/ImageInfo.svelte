<script lang="ts">
    import { Badges } from "../badge";
    import { H3 } from "../heading";
    import { Icons } from "../icons";
    import { Paragraphs, TextWithIcon } from "../text";

    interface Props {
        title?: string;
        description?: string;
        location?: string;
        tags?: string[];
    }

    const { title, description, location, tags }: Props = $props();
</script>

<div
    class="
        p-0
        lg:row-start-auto lg:h-auto lg:px-6
    ">
    <H3
        class="
            mt-0!
            has-[+p]:mb-4
        ">
        {title}
    </H3>
    {#if description}
        <Paragraphs text={description} />
    {/if}
    {#if location}
        <TextWithIcon icon={Icons.Location} class="mt-8">
            {location}
        </TextWithIcon>
    {/if}
    {#if tags}
        <Badges class="mt-6 flex-wrap" badges={tags} />
    {/if}
</div>
