<script lang="ts">
    import { H2 } from "../heading";

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

<section
    class="
        mt-32
        md:px-8
        lg:px-0
    ">
    <article>
        <H2>{title}</H2>
        <p
            class="
                mt-6 max-w-prose text-lg/8 hyphens-auto text-gray-600
                dark:text-gray-400
            ">
            {text}
        </p>
    </article>
    <dl
        class="
            mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 text-base/7
            sm:grid-cols-2
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
                <dd
                    class="
                        mt-1 text-gray-600
                        dark:text-gray-400
                    ">
                    {value.description}
                </dd>
            </div>
        {/each}
    </dl>
</section>
