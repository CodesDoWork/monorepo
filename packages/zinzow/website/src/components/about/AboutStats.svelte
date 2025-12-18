<script lang="ts">
    import { clsx } from "clsx";
    import { smallTextClasses } from "../../lib/common/styles";

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
        mb-8 flex flex-col gap-x-12 gap-y-8
        sm:mt-8 sm:mb-4 sm:gap-x-24
        md:gap-x-24
        lg:gap-x-40
    ">
    {#each stats as stat}
        <div
            class="
                flex flex-col-reverse
                sm:gap-y-1
            ">
            <dt class={clsx(smallTextClasses, "text-center text-base/7")}>
                {stat.name}
            </dt>
            <dd
                class="
                    text-primary text-center text-2xl font-semibold tracking-tight
                    sm:text-3xl
                    md:text-4xl
                    lg:text-5xl
                ">
                {stat.value}
            </dd>
        </div>
    {/each}
</dl>
