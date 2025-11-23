<script lang="ts">
    import type { PageData } from "./$types";
    import Icon from "@iconify/svelte";
    import { clsx } from "clsx";
    import Card from "../../../components/Card.svelte";
    import Heading from "../../../components/Heading.svelte";
    import TimeLine from "../../../components/TimeLine.svelte";
    import CvContent from "./components/CvContent.svelte";

    interface Props {
        data: PageData;
    }
    const { data }: Props = $props();

    const cardClass = "p-3 flex-col text-sm";
    const heading2Class = "text-lg! mb-2!";

    const formatter = new Intl.DateTimeFormat("de", { dateStyle: "medium" });
</script>

<svelte:head>
    <style>
        @page {
            size: A4;
            margin: 0;
        }
        body {
            size: A4;
            margin: 0;
        }

        @media print {
            html.dark body {
                background: linear-gradient(
                    to bottom,
                    oklch(29.3% 0.066 243.157) 5%,
                    oklch(27.7% 0.046 192.524) 95%
                );
                -webkit-print-color-adjust: exact;
            }
        }
    </style>
</svelte:head>

<div
    class="
        print:dark
        flex min-h-screen min-w-screen items-center justify-center
    "
    style="--page-color: oklch(68.5% 0.169 237.323);">
    <div
        class={clsx(
            "box-border h-[297mm] w-[210mm] p-[18mm] shadow-sm",
            "dark:from-primary-950 dark:to-secondary-950",
            "bg-linear-to-b from-5% to-95% transition-colors",
            "dark:text-white",
        )}>
        <main class="grid grid-cols-[auto_4fr_5fr] gap-2">
            <Heading level="h1" class="col-span-2 mt-0! mb-2! text-xl! text-black">
                {data.name}
            </Heading>
            <div class="row-span-12 flex flex-col items-end gap-2">
                <Card class={clsx(cardClass, "place-self-stretch")}>
                    <Heading level="h2" class={heading2Class}>Kontakt</Heading>
                    <address>
                        {data.address.street}
                        {data.address.houseNumber}<br />
                        {#if data.address.secondLine}
                            {data.address.secondLine}<br />on
                        {/if}
                        {data.address.zip}
                        {data.address.city}<br />
                    </address>
                    <ul class="mt-4 space-y-1">
                        {#each data.socials as social}
                            <li class="flex items-center gap-2">
                                <Icon
                                    icon={social.icon}
                                    class="size-5"
                                    style="color: {social.tone}" />
                                <a href={social.href}>{social.name}</a>
                            </li>
                        {/each}
                    </ul>
                </Card>
                {#each data.secondarySections as { section }}
                    <Card class={clsx(cardClass, "place-self-stretch")}>
                        <Heading level="h2" class={heading2Class}>{section.name}</Heading>
                        <CvContent
                            type={section.type}
                            value={section.items}
                            technologies={data.technologies} />
                    </Card>
                {/each}
            </div>
            <Card class="size-[9.55rem] p-4">
                <img src={data.portrait} alt="portrait" class="object-fit rounded-md" />
            </Card>
            <Card class={cardClass}>
                <p>Geburtsdatum: {formatter.format(new Date(data.birthday))}</p>
                <ul class="mt-2 ml-4 list-outside list-disc text-justify">
                    {#each data.softSkills as skill}
                        <li>{skill}</li>
                    {/each}
                </ul>
            </Card>
            <div class="col-span-2 flex flex-col gap-2">
                <Card class={cardClass}>
                    <Heading level="h2" class={heading2Class}>Ausbildung</Heading>
                    <TimeLine
                        small
                        steps={data.experiences.map(e => e.experience)}
                        logo={e => e.logo}>
                        {#snippet date(e)}
                            {e.date}
                        {/snippet}
                        {#snippet title(e)}
                            {e.title}
                        {/snippet}
                        {#snippet content(e)}
                            {#if e.duration}
                                <div class="mt-1 flex items-center gap-1">
                                    <Icon icon="mingcute:time-duration-line" class="size-4" />
                                    <p>{e.duration}</p>
                                </div>
                            {/if}
                            {#if e.grade}
                                <div class="flex items-center gap-1">
                                    <Icon icon="ix:average" class="size-4" />
                                    <p>Note: {e.grade}</p>
                                </div>
                            {/if}
                            {#if e.position}
                                <div class="flex items-center gap-1">
                                    <Icon icon="icon-park-solid:people" class="size-4" />
                                    <p>{e.position}</p>
                                </div>
                            {/if}
                            <div class="flex items-center gap-1">
                                <Icon icon="tdesign:institution-filled" class="size-4" />
                                <p>{e.institution}</p>
                            </div>
                            <div class="flex items-center gap-1">
                                <Icon icon="mdi:location" class="size-4" />
                                <p>{e.location}</p>
                            </div>
                        {/snippet}
                    </TimeLine>
                </Card>
                {#each data.primarySections as { section }}
                    <Card class={clsx(cardClass, "place-self-stretch")}>
                        <Heading level="h2" class={heading2Class}>{section.name}</Heading>
                        <CvContent
                            type={section.type}
                            value={section.items}
                            technologies={data.technologies} />
                    </Card>
                {/each}
            </div>
        </main>
    </div>
</div>
