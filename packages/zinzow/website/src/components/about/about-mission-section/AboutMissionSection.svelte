<script lang="ts">
    import { H2 } from "../../heading";

    interface Props {
        title: string;
        text: string;
    }

    const { title, text }: Props = $props();
</script>

<section
    class="
        mt-16
        md:mt-24
    ">
    <article>
        <H2>{title}</H2>
        <p
            lang="de"
            class="
                max-w-prose text-justify text-lg hyphens-auto text-gray-600
                sm:text-xl/8
                dark:text-gray-400
            ">
            {text}
        </p>
    </article>
</section>
