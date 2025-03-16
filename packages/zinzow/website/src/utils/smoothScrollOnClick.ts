type ClickEvent = MouseEvent & { currentTarget: EventTarget & HTMLAnchorElement };

export function smoothScrollOnClick(event: ClickEvent) {
    const href = event.currentTarget.getAttribute("href");
    if (href.startsWith("#")) {
        event.preventDefault();
        const el = document.querySelector(href);
        el && el.scrollIntoView({ behavior: "smooth" });
    }
}
