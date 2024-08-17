import { onMount } from "svelte";
import { writable, type Writable } from "svelte/store";

function isInitialFunction<T>(initial?: T | (() => T)): initial is () => T {
    return typeof initial === "function";
}

export function useLocalStorage<T>(key: string, initial?: T | (() => T)): Writable<T> {
    const store = writable(isInitialFunction(initial) ? undefined : initial);
    onMount(() => {
        const initialValue = isInitialFunction(initial) ? initial() : initial;
        const value = localStorage.getItem(key);
        store.set(value === null ? initialValue : JSON.parse(value));
        store.subscribe(v => localStorage.setItem(key, JSON.stringify(v)));
    });

    return store as Writable<T>;
}
