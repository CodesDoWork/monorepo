import type { JustSiteBooks } from "../../types/directus";

export type Book = JustSiteBooks & {
    url: string;
    cover?: {
        medium: string;
    };
    categories: string[];
    subjects?: string[];
};
