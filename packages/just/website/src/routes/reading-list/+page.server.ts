import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { Thing } from "schema-dts";
import type { LayoutServerData } from "../$types";
import type { GetReadingListDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetReadingListData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";
import { createBreadcrumbList } from "../../shared/urls";

export const load: PageServerLoad = async ({ parent }) => {
    const parentData = await parent();
    const { currentLanguage } = parentData;
    const res = flattenTranslations(
        await toPromise(GetReadingListData({ variables: { language: currentLanguage.code } })),
    );

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
        cover: assetUrl(book.cover, { quality: 20 }),
    }));
}

function createJsonLdThings(
    parentData: LayoutServerData,
    books: ReturnType<typeof transformBooks>,
): Thing[] {
    const { currentLanguage, currentRoute, homeRoute } = parentData;
    const bookThings: Thing[] = books.map(book => ({
        "@type": "Book",
        name: book.title,
        author: book.authors.map(name => ({ "@type": "Person", name })),
        image: book.cover,
        genre: book.categories,
        description: book.description,
        inLanguage: currentLanguage.short,
    }));

    return [...bookThings, createBreadcrumbList(currentRoute, homeRoute)];
}
