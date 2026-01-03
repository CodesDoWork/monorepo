<script lang="ts">
    import type { Book } from "./types";
    import { animationDelay } from "@cdw/monorepo/shared-utils/css/animation-delay";
    import { normalizeAnchor } from "@cdw/monorepo/shared-utils/html/common";
    import { H3 } from "../../components/texts";
    import BookCard from "./BookCard.svelte";

    interface Props {
        category: string;
        books: Book[];
        featuredText: string;
        style?: string;
        categoryIndex?: number;
    }

    const { category, books, featuredText, style, categoryIndex = 0 }: Props = $props();

    function byCategory(category: string) {
        return function (book: Book) {
            return category === featuredText ? book.featured : book.categories.includes(category);
        };
    }
</script>

<section class="animate-fadeIn opacity-0" {style}>
    <H3 class="mt-8" id={normalizeAnchor(category)}>{category}</H3>
    <ul
        class="
            grid grid-cols-1 content-stretch gap-4
            sm:grid-cols-2
            xl:grid-cols-3
            2xl:grid-cols-4
        ">
        {#each books.filter(byCategory(category)) as book, idx (idx)}
            <li>
                <BookCard style={animationDelay(categoryIndex + idx + 1)} {book} {featuredText} />
            </li>
        {/each}
    </ul>
</section>
