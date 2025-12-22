import { clsx } from "clsx";

export function fadeInBottom(...classes: string[]) {
    return clsx(...classes, "animate-fadeInBT opacity-0");
}

export function fadeIn(...classes: string[]) {
    return clsx(...classes, "animate-fadeIn opacity-0");
}

export function animationDelay(i: number) {
    return `animation-delay: ${i * 0.1}s;`;
}
