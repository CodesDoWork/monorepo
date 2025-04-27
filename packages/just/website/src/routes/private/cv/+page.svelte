<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../../../components/Card.svelte";
    import Heading from "../../../components/Heading.svelte";

    interface Props {
        data: PageData;
    }
    const { data }: Props = $props();
</script>

<svelte:head>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            margin: 0;
        }
    </style>
</svelte:head>

<div class="min-w-screen min-h-screen flex justify-center items-center">
    <div
        class={clsx(
            "w-a4 h-a4 p-a4-page-padding shadow-a4 box-border",
            "from-primary-400 to-secondary-400 dark:from-primary-950 dark:to-secondary-950",
            "bg-gradient-to-b from-5% to-95% transition-colors",
            "dark:text-white",
        )}>
        <main class="grid grid-cols-[1fr_auto] gap-2">
            <div class="flex flex-col gap-2">
                <Heading level="h1" class="!text-xl !mt-0 dark:!text-primary-500 col-span-4">
                    {data.name}
                </Heading>
                <Card class="p-2 flex-col">
                    <p>{data.summary}</p>
                </Card>
                <Card class="p-2">
                    <Heading level="h2" class="!text-lg">Erfahrung</Heading>
                </Card>
            </div>
            <div class="flex gap-2 flex-col items-end">
                <Card class="col-span-2 size-40 p-4">
                    <img src={data.iamgeUrl} alt="portrait" class="object-fit rounded-md" />
                </Card>
                <Card class="w-max col-span-4 p-4 flex-col">
                    <Heading level="h2" class="!text-lg">Kontakt</Heading>
                    <address>
                        {data.address.street}
                        {data.address.houseNumber}<br />
                        {#if data.address.secondLine}
                            {data.address.secondLine}<br />
                        {/if}
                        {data.address.zip}
                        {data.address.city}<br />
                    </address>
                    <ul class="mt-4">
                        {#each data.socials as social}
                            <li class="flex gap-2">
                                <Icon
                                    icon={social.icon}
                                    class="size-6"
                                    style="color: {social.tone}" />
                                <a href={social.href}>{social.name}</a><br />
                            </li>
                        {/each}
                    </ul>
                </Card>
            </div>
        </main>
    </div>
</div>
