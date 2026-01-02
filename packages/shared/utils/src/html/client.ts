type ClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement };

export function smoothScrollOnClick(event: ClickEvent) {
    const href = event.currentTarget.getAttribute("href");
    if (href?.startsWith("#")) {
        event.preventDefault();
        smoothScrollTo(href);
        history.pushState(null, "", href);
    }
}

export function smoothScrollTo(tag: string) {
    const el = document.querySelector(tag);
    el && el.scrollIntoView({ behavior: "smooth", block: "start" });
}
