import type { FlatTrans } from "@cdw/monorepo/shared-graphql";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetReadingListDataQuery } from "../../graphql/default/generated/graphql";
import type { PageServerLoad } from "./$types";
import { flattenTranslations } from "@cdw/monorepo/shared-graphql";
import { directusImageParams } from "@cdw/monorepo/shared-svelte-components";
import { defaultNull } from "@cdw/monorepo/shared-utils/default-null";
import { env } from "../../env";
import { queryDefault } from "../../graphql/default/client";
import { GetReadingListDataDocument } from "../../graphql/default/generated/graphql";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;

    const data = await queryDefault({
        query: GetReadingListDataDocument,
        variables: { language: currentLanguage.code },
    });
    const res = flattenTranslations(data);

    const books = transformBooks(res.books);
    const categories = new Set(
        books.flatMap(book => book.categories).sort((s1, s2) => s1.localeCompare(s2)),
    );

    const jsonLdThings = createJsonLdThings(parentData, books);

    return { books, categories, texts: res.texts, jsonLdThings };
};

function transformBooks(books: FlatTrans<GetReadingListDataQuery["books"]>) {
    return books.map(book => ({
        ...book,
        categories: book.categories.map(cat => cat.category.name),
        authors: (book.authors ?? []) as string[],
        cover: directusImageParams(env.CMS_URL, {
            ...defaultNull(book.cover),
            alt: "book cover",
            assetParams: { width: 128, quality: 50 },
        }),
    }));
}

function createJsonLdThings(
    parentData: LayoutServerData,
    books: ReturnType<typeof transformBooks>,
): Thing[] {
    const { currentLanguage } = parentData;
    return books.map(book => ({
        "@type": "Book",
        name: book.title,
        author: book.authors.map(name => ({ "@type": "Person", name })),
        image: book.cover.src,
        genre: book.categories,
        description: book.description,
        inLanguage: currentLanguage.short,
    }));
}
