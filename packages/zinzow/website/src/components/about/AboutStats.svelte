<script lang="ts">
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { clsx } from "clsx";
    import { fadeInBottom, smallTextClasses } from "../../lib/common/styles";

    interface Stats {
        name: string;
        value: string;
    }

    interface Props {
        stats: Stats[];
        animationDelay: number;
    }

    const { stats, animationDelay: delay }: Props = $props();
</script>

<dl
    class="
        xs:w-fit xs:flex-row xs:justify-around
        mb-8 flex flex-col gap-x-12 gap-y-8
        sm:mt-8 sm:mb-4 sm:gap-x-24
        md:gap-x-24
        lg:gap-x-40
    ">
    {#each stats as stat, idx (idx)}
        <div
            style={animationDelay(idx + delay)}
            class={clsx(
                fadeInBottom,
                `
                    flex flex-col-reverse
                    sm:gap-y-1
                `,
            )}>
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
