<script lang="ts">
    import { clsx } from "clsx";
    import { smallTextClasses } from "../../lib/common/styles";
    import { H2 } from "../heading";
    import { P } from "../text";

    interface Props {
        title: string;
        text: string;
        values: {
            name: string;
            description: string;
        }[];
    }

    const { title, text, values }: Props = $props();
</script>

<section>
    <article>
        <H2>{title}</H2>
        <P prose block>{text}</P>
    </article>
    <dl
        class="
            mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-8 px-4 text-base/7
            sm:grid-cols-2 sm:gap-12 sm:px-8
            lg:mx-0 lg:max-w-none lg:grid-cols-3
        ">
        {#each values as value}
            <div>
                <dt
                    class="
                        font-semibold text-gray-900
                        dark:text-gray-100
                    ">
                    {value.name}
                </dt>
                <dd class={clsx(smallTextClasses, "mt-1 text-base/7!")}>
                    {value.description}
                </dd>
            </div>
        {/each}
    </dl>
</section>
