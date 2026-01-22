import type { Action } from "svelte/action";

export interface OverflowingInfo {
    parent: boolean;
    viewport: boolean;
    edges: {
        top: boolean;
        bottom: boolean;
        left: boolean;
        right: boolean;
    };
}

interface OverflowEdges {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}

export const overflowOberserver: Action<HTMLElement, (info: OverflowingInfo) => void> = (
    node,
    callback,
) => {
    const checkOverflow = () => {
        const rect = node.getBoundingClientRect();
        const parent = node.parentElement;

        if (!parent) {
            return;
        }

        const pRect = parent.getBoundingClientRect();
        const parentEdges: OverflowEdges = {
            top: rect.top < pRect.top,
            left: rect.left < pRect.left,
            bottom: rect.bottom > pRect.bottom,
            right: rect.right > pRect.right,
        };
        const overflowsParent =
            parentEdges.top || parentEdges.left || parentEdges.bottom || parentEdges.right;

        const viewportEdges: OverflowEdges = {
            top: rect.top < 0,
            left: rect.left < 0,
            bottom: rect.bottom > (window.innerHeight || document.documentElement.clientHeight),
            right: rect.right > (window.innerWidth || document.documentElement.clientWidth),
        };
        const overflowsViewport =
            viewportEdges.top || viewportEdges.left || viewportEdges.bottom || viewportEdges.right;

        callback({
            parent: overflowsParent,
            viewport: overflowsViewport,
            edges: {
                top: rect.top < pRect.top,
                bottom: rect.bottom > pRect.bottom,
                left: rect.left < pRect.left,
                right: rect.right > pRect.right,
            },
        });
    };

    const observer = new ResizeObserver(checkOverflow);

    observer.observe(node);
    if (node.parentElement) {
        observer.observe(node.parentElement);
    }

    window.addEventListener("scroll", checkOverflow, true);
    window.addEventListener("resize", checkOverflow);

    return {
        destroy() {
            observer.disconnect();
            window.removeEventListener("scroll", checkOverflow, true);
            window.removeEventListener("resize", checkOverflow);
        },
    };
};
