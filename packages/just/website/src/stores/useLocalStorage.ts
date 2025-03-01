import type { Writable } from "svelte/store";
import { onMount } from "svelte";
import { writable } from "svelte/store";

export function useLocalStorage<T>(key: string, initial: unknown = null): Writable<T> {
    const isInitialFunction = typeof initial === "function";
    const store = writable(isInitialFunction ? undefined : initial);
    onMount(() => {
        const initialValue = isInitialFunction ? initial() : initial;
        const value = localStorage.getItem(key);
        store.set(value === null ? initialValue : JSON.parse(value));
        store.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
    });

    return store as Writable<T>;
}
