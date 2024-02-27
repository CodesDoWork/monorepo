export type Book = MyBook & OpenLibBook;

export interface MyBook extends Partial<OpenLibBook> {
    title: string;
    isbn: string;
    rating?: number;
    featured: boolean;
    categories: BookCategory[];
    description: string;
}

export type BookCategory =
    | "Body"
    | "Communication"
    | "Dating"
    | "Finance"
    | "Health"
    | "Leadership"
    | "Love"
    | "Masculinity"
    | "Mindset"
    | "NLP"
    | "Philosophy"
    | "Productivity"
    | "Psychology"
    | "Sexuality"
    | "Skills"
    | "Spirituality";

export interface OpenLibBook {
    url: string;
    key: string;
    title: string;
    subtitle: string;
    authors: {
        url: string;
        name: string;
    }[];
    number_of_pages: number;
    identifiers: Record<string, string[]>;
    publishers: {
        name: string;
    }[];
    publish_places: {
        name: string;
    }[];
    publish_date: string;
    subjects: {
        name: string;
        url: string;
    }[];
    excerpts: {
        text: string;
        comment: string;
        first_sentence: boolean;
    };
    cover: {
        small: string;
        medium: string;
        large: string;
    };
}
