import type { Action } from "svelte/action";

type ActionWhenInViewportParams = () => void;

export const actionWhenInViewport: Action<HTMLElement, ActionWhenInViewportParams> = (
    node,
    callback,
) => {
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
            callback();
        }
    });

    observer.observe(node);

    return {
        destroy() {
            observer.unobserve(node);
        },
    };
};
