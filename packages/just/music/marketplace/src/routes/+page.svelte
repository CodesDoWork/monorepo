<script lang="ts">
    import type { PageData } from "./$types";
    import { H1 } from "@cdw/monorepo/just-shared-svelte-components/texts";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import { LinkCard } from "../components/cards";

    interface Props {
        data: PageData;
    }

    const { data }: Props = $props();
    const { dashboardItems, furhterLinks } = $derived(data);

    const itemLinkClasses = clsx("flex items-center justify-center gap-2");
    const itemIconClasses = clsx("size-8");
</script>

<div class="relative grid h-screen items-center justify-center">
    <H1 class="absolute top-16 w-full">Just Music Marketplace</H1>
    <section class="flex flex-col">
        <ul class="grid grid-cols-2 gap-8">
            {#each dashboardItems as item}
                <li>
                    <LinkCard href={item.url} class={itemLinkClasses}>
                        {#if item.icon}
                            <DirectusImage img={item.icon} class={itemIconClasses} />
                        {/if}
                        {item.title}
                    </LinkCard>
                </li>
            {/each}
            {#each furhterLinks as link}
                <li>
                    <LinkCard href={link.href} class={itemLinkClasses}>
                        {#if typeof link.icon === "object" && "path" in link.icon}
                            <img src={link.icon.path} alt="icon" class={itemIconClasses} />
                        {:else}
                            <Icon
                                icon={typeof link.icon === "string" ? link.icon : link.icon.name}
                                class={clsx(
                                    itemIconClasses,
                                    typeof link.icon === "object" && link.icon.class,
                                )} />
                        {/if}
                        {link.title}
                    </LinkCard>
                </li>
            {/each}
        </ul>
    </section>
</div>
