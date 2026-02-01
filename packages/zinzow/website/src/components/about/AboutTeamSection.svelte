<script lang="ts">
    import type { DirectusImageParams } from "@cdw/monorepo/shared-svelte-components";
    import { DirectusImage } from "@cdw/monorepo/shared-svelte-components";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { fadeIn, fadeInBottom, smallTextClasses } from "../../lib/common/styles";
    import { H2, H4 } from "../heading";
    import { Icons } from "../icons";
    import { P, TextWithIcon } from "../text";

    interface Props {
        title: string;
        text: string;
        members: {
            forename: string;
            surname?: string;
            portrait?: DirectusImageParams;
            position?: string;
            function?: string;
            phone?: string;
        }[];
        animationDelay: number;
    }

    const { title, text, members, animationDelay: delay }: Props = $props();
</script>

<section>
    <article class={fadeIn} style={animationDelay(delay)}>
        <H2>{title}</H2>
        <P prose block>{text}</P>
    </article>
    <ul
        role="list"
        class="
            mx-auto mt-20 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-center
            sm:grid-cols-2
            md:grid-cols-3
            lg:mx-0 lg:max-w-none lg:grid-cols-4
            xl:grid-cols-5
        ">
        {#each members as member, idx (idx)}
            <li class={fadeInBottom} style={animationDelay(delay + idx + 1)}>
                {#if member.portrait}
                    <DirectusImage
                        img={member.portrait}
                        imgClass="rounded-full shadow-md"
                        class="mx-auto size-24" />
                {:else}
                    <div
                        class="
                            mx-auto size-24 rounded-full bg-gray-200 shadow-md
                            dark:bg-gray-800
                        ">
                    </div>
                {/if}
                <H4 class="mt-4">{member.forename}{member.surname ? ` ${member.surname}` : ``}</H4>
                {#if member.position}
                    <p
                        class={clsx(`
                            mt-1 text-sm/6 font-bold text-gray-900
                            dark:text-gray-100
                        `)}>
                        {member.position}
                    </p>
                {/if}
                {#if member.function}
                    <p class={clsx(smallTextClasses, "-mt-0.5")}>
                        {member.function}
                    </p>
                {/if}
                {#if member.phone}
                    <TextWithIcon
                        class="mx-auto mt-4 max-w-full"
                        href={`tel:${member.phone}`}
                        icon={Icons.Phone}
                        iconContainerClass="pt-1"
                        small>
                        {member.phone}
                    </TextWithIcon>
                {/if}
            </li>
        {/each}
    </ul>
</section>
