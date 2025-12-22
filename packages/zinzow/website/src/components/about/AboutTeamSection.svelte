<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { animationDelay, fadeIn, fadeInBottom } from "../../lib/client/animate";
    import { smallTextClasses } from "../../lib/common/styles";
    import { DirectusImage } from "../directus-image";
    import { H2, H4 } from "../heading";
    import { P } from "../text";

    interface Props {
        title: string;
        text: string;
        members: {
            forename: string;
            surname?: string;
            portrait?: DirectusImageParams;
            position?: string;
        }[];
        animationDelay: number;
    }

    const { title, text, members, animationDelay: delay }: Props = $props();
</script>

<section>
    <article class={fadeIn()} style={animationDelay(delay)}>
        <H2>{title}</H2>
        <P prose block>{text}</P>
    </article>
    <ul
        role="list"
        class="
            mx-auto mt-20 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-16 text-center
            sm:grid-cols-3
            md:grid-cols-4
            lg:mx-0 lg:max-w-none lg:grid-cols-5
            xl:grid-cols-6
        ">
        {#each members as member, idx (idx)}
            <li class={fadeInBottom()} style={animationDelay(delay + idx + 1)}>
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
                    <p class={smallTextClasses}>
                        {member.position}
                    </p>
                {/if}
            </li>
        {/each}
    </ul>
</section>
