export function smoothScrollTo(querySelector: string) {
    const el = document.querySelector(querySelector);
    el && el.scrollIntoView({ behavior: "smooth" });
}
