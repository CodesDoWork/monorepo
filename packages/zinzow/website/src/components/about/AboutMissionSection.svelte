<script lang="ts">
    import { animationDelay, fadeIn } from "../../lib/client/animate";
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
    <article class={fadeIn()} style={animationDelay(delay)}>
        <H2>{title}</H2>
        <P lang="de" prose block>
            {text}
        </P>
    </article>
</section>
