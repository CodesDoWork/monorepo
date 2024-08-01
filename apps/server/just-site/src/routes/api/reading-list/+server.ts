import { getBooks, getDirectus } from "../../../helpers/directus";

export async function GET() {
    const directus = await getDirectus();
    const books = await getBooks(directus);
    const enrichedBooks = await fetchChunk(books);
    sortBooks(enrichedBooks);

    return new Response(JSON.stringify(enrichedBooks));
}

function fetchChunk(books: any[]) {
    const bibkeys = books.map(book => `ISBN:${book.isbn}`).join(",");
    return fetch(`https://openlibrary.org/api/books?bibkeys=${bibkeys}&jscmd=data&format=json`)
        .then(res => res.json())
        .then(Object.entries)
        .then(resBooks =>
            books.map(book => ({
                ...book,
                ...(resBooks.find(resBook => resBook[0] === `ISBN:${book.isbn}`) || ["", {}])[1],
                ...(book.cover ? { cover: book.cover } : {}),
            })),
        )
        .then(enrichedBooks => enrichedBooks.map(sanitizeBook));
}

function sanitizeBook(book: any) {
    book.authors = book.authors?.slice(0, 1);

    return book;
}

function sortBooks(books: any[]) {
    books.sort((a, b) => a.title.localeCompare(b.title)).sort((a, b) => +b.featured - +a.featured);
}
