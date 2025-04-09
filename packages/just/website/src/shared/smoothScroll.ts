export function smoothScrollTo(querySelector: string) {
    const el = document.querySelector(querySelector);
    console.log(el);
    el && el.scrollIntoView({ behavior: "smooth" });
}
