<script lang="ts">
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { fadeIn } from "../../lib/common/styles";
    import { H2 } from "../heading";
    import { P } from "../text";

    interface Props {
        title: string;
        text: string;
        animationDelay: number;
    }

    const { title, text, animationDelay: delay }: Props = $props();
</script>

<section>
    <article class={fadeIn} style={animationDelay(delay)}>
        <H2>{title}</H2>
        <P lang="de" prose block>
            {text}
        </P>
    </article>
</section>
