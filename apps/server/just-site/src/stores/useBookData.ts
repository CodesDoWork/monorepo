import { readable } from "svelte/store";
import { onMount } from "svelte";
import type { Book, MyBook } from "../types/Book";
import { Stream } from "stream-browserify";

const chunkSize = 5;

export function useBookData(books: MyBook[]) {
    return readable<Book[]>([], set => {
        onMount(() => {
            const resultBooks = [];
            const stream = new Stream();
            stream.on("data", data => {
                resultBooks.push(...data);
                sortBooks(resultBooks);
                set(resultBooks);
            });

            streamBooks(books, stream);
        });
    });
}

function streamBooks(books: MyBook[], stream: Stream) {
    for (let chunkStart = 0; chunkStart < books.length; chunkStart += chunkSize) {
        const chunk = books.slice(chunkStart, chunkStart + chunkSize);
        fetchChunk(chunk).then(res => stream.emit("data", res));
    }
}

function fetchChunk(books: MyBook[]): Promise<Book[]> {
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

function sanitizeBook(book: Book) {
    book.authors = book.authors?.slice(0, 1);

    return book;
}

function sortBooks(books: Book[]) {
    books
        .sort((a, b) => a.title.localeCompare(b.title))
        .sort((a, b) => b.rating - a.rating)
        .sort((a, b) => +b.featured - +a.featured);
}
