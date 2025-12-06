<script lang="ts">
    import type { DirectusImageParams } from "../../lib/common/directus-image";
    import { DirectusImage } from "../directus-image";
    import { H2, H4 } from "../heading";

    interface Props {
        title: string;
        text: string;
        members: {
            forename: string;
            surname?: string;
            portrait?: DirectusImageParams;
            position?: string;
        }[];
    }

    const { title, text, members }: Props = $props();
</script>

<section
    class="
        md:px-8
        lg:px-0
    ">
    <article>
        <H2>{title}</H2>
        <p
            class="
                mt-6 max-w-prose text-justify text-lg/8 hyphens-auto text-gray-600
                dark:text-gray-400
            ">
            {text}
        </p>
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
        {#each members as member}
            <li>
                {#if member.portrait}
                    <DirectusImage img={member.portrait} class="mx-auto size-24 rounded-full" />
                {:else}
                    <div
                        class="
                            mx-auto size-24 rounded-full bg-gray-200
                            dark:bg-gray-800
                        ">
                    </div>
                {/if}
                <H4 class="mt-4">{member.forename}{member.surname ? ` ${member.surname}` : ``}</H4>
                {#if member.position}
                    <p
                        class="
                            text-sm/6 text-gray-600
                            dark:text-gray-400
                        ">
                        {member.position}
                    </p>
                {/if}
            </li>
        {/each}
    </ul>
</section>
