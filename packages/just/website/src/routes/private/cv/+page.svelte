<script lang="ts">
    import type { PageData } from "./$types";
    import DirectusImage from "@cdw/monorepo/packages/shared/svelte/components/src/directus-image/DirectusImage.svelte";
    import { clsx } from "clsx";
    import { Card } from "../../../components/card";
    import { H1, H2, P } from "../../../components/texts";
    import { TimeLine } from "../../../components/timeline";
    import { Icons } from "../../../lib/client/icons";
    import CvContent from "./CvContent.svelte";

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
            <H1 class="col-span-2 mt-0! mb-2! text-xl! text-black">
                {data.name}
            </H1>
            <div class="row-span-12 flex flex-col items-end gap-2">
                <Card class={clsx(cardClass, "place-self-stretch")}>
                    <H2 class={heading2Class}>Kontakt</H2>
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
                                <span
                                    class={clsx(Icons[social.icon], "size-5")}
                                    style="color: {social.tone}"></span>
                                <a href={social.href}>{social.name}</a>
                            </li>
                        {/each}
                    </ul>
                </Card>
                {#each data.secondarySections as { section }}
                    <Card class={clsx(cardClass, "place-self-stretch")}>
                        <H2 class={heading2Class}>{section.name}</H2>
                        <CvContent
                            type={section.type}
                            value={section.items}
                            technologies={data.technologies} />
                    </Card>
                {/each}
            </div>
            <Card class="size-[9.55rem] p-4">
                <DirectusImage img={data.portrait} imgClass="object-fit! rounded-md" />
            </Card>
            <Card class={cardClass}>
                <P>Geburtsdatum: {formatter.format(new Date(data.birthday))}</P>
                <ul class="mt-2 ml-4 list-outside list-disc text-justify">
                    {#each data.softSkills as skill}
                        <li>{skill}</li>
                    {/each}
                </ul>
            </Card>
            <div class="col-span-2 flex flex-col gap-2">
                <Card class={cardClass}>
                    <H2 class={heading2Class}>Ausbildung</H2>
                    <TimeLine small steps={data.experiences} logo={e => e.logo}>
                        {#snippet date(e)}
                            {e.date}
                        {/snippet}
                        {#snippet title(e)}
                            {e.title}
                        {/snippet}
                        {#snippet content(e)}
                            {#if e.duration}
                                <div class="mt-1 flex items-center gap-1">
                                    <span class="icon-[mingcute--time-duration-line] size-4"></span>
                                    <P>{e.duration}</P>
                                </div>
                            {/if}
                            {#if e.grade}
                                <div class="flex items-center gap-1">
                                    <span class="icon-[ix--average] size-4"></span>
                                    <P>Note: {e.grade}</P>
                                </div>
                            {/if}
                            {#if e.position}
                                <div class="flex items-center gap-1">
                                    <span class="icon-[icon-park-solid--people] size-4"></span>
                                    <P>{e.position}</P>
                                </div>
                            {/if}
                            <div class="flex items-center gap-1">
                                <span class="icon-[tdesign--institution-filled] size-4"></span>
                                <P>{e.institution}</P>
                            </div>
                            <div class="flex items-center gap-1">
                                <span class="icon-[mdi--location] size-4"></span>
                                <P>{e.location}</P>
                            </div>
                        {/snippet}
                    </TimeLine>
                </Card>
                {#each data.primarySections as { section }}
                    <Card class={clsx(cardClass, "place-self-stretch")}>
                        <H2 class={heading2Class}>{section.name}</H2>
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
