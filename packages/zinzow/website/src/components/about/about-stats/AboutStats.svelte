<script lang="ts">
    interface Stats {
        name: string;
        value: string;
    }

    interface Props {
        stats: Stats[];
    }

    const { stats }: Props = $props();
</script>

<dl
    class="
        mx-auto -mt-16 mb-12 flex w-fit flex-col gap-x-8 gap-y-8 rounded-2xl border border-gray-200
        px-8 py-8
        sm:flex-row
        md:mb-16 md:gap-x-16 md:px-12 md:py-12
        lg:gap-x-32 lg:px-24
        dark:border-gray-800
    ">
    {#each stats as stat}
        <div
            class="
                flex flex-col-reverse
                sm:gap-y-1
            ">
            <dt
                class="
                    text-center text-base/7 text-gray-600
                    dark:text-gray-400
                ">
                {stat.name}
            </dt>
            <dd
                class="
                    text-center text-2xl font-semibold tracking-tight text-(--primary)
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                ">
                {stat.value}
            </dd>
        </div>
    {/each}
</dl>
