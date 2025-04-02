import type { FlatTrans } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import type { GetReadingListDataQuery } from "../../graphql/default/generated/gql";
import type { PageServerLoad } from "./$types";
import { toPromise } from "@cdw/monorepo/shared-utils/svelte/graphql/apollo";
import { flattenTranslations } from "@cdw/monorepo/shared-utils/svelte/graphql/translations";
import { GetReadingListData } from "../../graphql/default/generated/gql";
import { assetUrl } from "../../shared/assets";

export const load: PageServerLoad = async ({ parent }) => {
    const { language } = await parent();
    const res = flattenTranslations(
        await toPromise(GetReadingListData({ variables: { language } })),
    );

    const books = transformBooks(res.books);

    const categories = new Set(
        books.flatMap(book => book.categories).sort((s1, s2) => s1.localeCompare(s2)),
    );

    return { books, categories };
};

function transformBooks(books: FlatTrans<GetReadingListDataQuery["books"]>) {
    return books.map(book => ({
        ...book,
        categories: book.categories.map(cat => cat.category.name),
        authors: (book.authors ?? []) as string[],
        cover: assetUrl(book.cover),
    }));
}
