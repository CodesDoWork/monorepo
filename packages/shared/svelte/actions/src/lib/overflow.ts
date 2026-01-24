import type { Action } from "svelte/action";

export interface OverflowResult {
    overflow: OverflowingInfo;
    outside: OverflowingInfo;
}

export interface OverflowingInfo {
    parent: boolean;
    parentEdges: OverflowEdges;
    viewport: boolean;
    viewportEdges: OverflowEdges;
}

export interface OverflowEdges {
    top: boolean;
    bottom: boolean;
    left: boolean;
    right: boolean;
}

export const overflowOberserver: Action<HTMLElement, (info: OverflowResult) => void> = (
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
        const overflowsParentEdges = isOverflowing(pRect, rect);
        const overflowsParent = overflowResult(overflowsParentEdges);
        const outsideParentEdges = isOutside(pRect, rect);
        const outsideParent = overflowResult(outsideParentEdges);

        const viewportRect = new DOMRect(
            0,
            0,
            window.innerWidth || document.documentElement.clientWidth,
            window.innerHeight || document.documentElement.clientHeight,
        );
        const overflowsViewportEdges = isOverflowing(viewportRect, rect);
        const overflowsViewport = overflowResult(overflowsViewportEdges);
        const outsideViewportEdges = isOutside(viewportRect, rect);
        const outsideViewport = overflowResult(outsideViewportEdges);

        callback({
            overflow: {
                parent: overflowsParent,
                parentEdges: overflowsParentEdges,
                viewport: overflowsViewport,
                viewportEdges: overflowsViewportEdges,
            },
            outside: {
                parent: outsideParent,
                parentEdges: outsideParentEdges,
                viewport: outsideViewport,
                viewportEdges: outsideViewportEdges,
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

    checkOverflow();

    return {
        destroy() {
            observer.disconnect();
            window.removeEventListener("scroll", checkOverflow, true);
            window.removeEventListener("resize", checkOverflow);
        },
    };
};

function isOverflowing(outer: DOMRect, inner: DOMRect): OverflowEdges {
    return {
        top: inner.top < outer.top,
        left: inner.left < outer.left,
        bottom: inner.bottom > outer.bottom,
        right: inner.right > outer.right,
    };
}

function isOutside(outer: DOMRect, inner: DOMRect): OverflowEdges {
    return {
        top: inner.bottom < outer.top,
        left: inner.right < outer.left,
        bottom: inner.top > outer.bottom,
        right: inner.left > outer.right,
    };
}

function overflowResult(edges: OverflowEdges): boolean {
    return edges.top || edges.left || edges.bottom || edges.right;
}
