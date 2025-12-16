<script lang="ts">
    import { H2 } from "../heading";
    import { P } from "../text";

    interface Props {
        title: string;
        text: string;
    }

    const { title, text }: Props = $props();
</script>

<section
    class="
        mt-24
        md:mt-32
    ">
    <article>
        <H2>{title}</H2>
        <P lang="de" prose block>
            {text}
        </P>
    </article>
</section>
