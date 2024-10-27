import { getBooks, getDirectus } from "../../../helpers/directus";
import type { DirectusBook } from "../../../types/dtos";
import type { Book } from "../../../types/frontend";

export async function GET() {
    const directus = await getDirectus();
    const books = await getBooks(directus);
    const enrichedBooks = await fetchChunk(books);
    sortBooks(enrichedBooks);

    return new Response(JSON.stringify(enrichedBooks));
}

function fetchChunk(books: DirectusBook[]): Promise<Book[]> {
    const bibkeys = books.map(book => `ISBN:${book.isbn}`).join(",");
    return fetch(`https://openlibrary.org/api/books?bibkeys=${bibkeys}&jscmd=data&format=json`)
        .then(res => res.json())
        .then(
            resBooks =>
                books.map(
                    book =>
                        ({
                            ...book,
                            ...(resBooks[`ISBN:${book.isbn}`] || {}),
                            ...(book.cover ? { cover: book.cover } : {}),
                        }) satisfies Book,
                ) as Book[],
        )
        .then(enrichedBooks => enrichedBooks.map(sanitizeBook));
}

function sanitizeBook(book: Book) {
    book.authors = book.authors.slice(0, 1);

    return book;
}

function sortBooks(books: Book[]) {
    books.sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => +b.featured - +a.featured);
}
