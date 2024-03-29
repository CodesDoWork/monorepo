import { writable } from "svelte/store";
import { onMount } from "svelte";

export function useLocalStorage(key: string, initial: unknown = null) {
    const isInitialFunction = typeof initial === "function";
    const store = writable(isInitialFunction ? undefined : initial);
    onMount(() => {
        const initialValue = isInitialFunction ? initial() : initial;
        const value = localStorage.getItem(key);
        store.set(value === null ? initialValue : JSON.parse(value));
        store.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
    });

    return store;
}
