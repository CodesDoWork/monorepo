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
        xs:flex-row xs:justify-around xs:w-fit
        -mt-8 mb-16 flex flex-col gap-x-12 gap-y-8
        sm:gap-x-24
        md:mb-20 md:gap-x-24
        lg:-mt-16 lg:gap-x-40
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
