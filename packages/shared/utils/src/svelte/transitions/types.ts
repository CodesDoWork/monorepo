import type {
    blur,
    BlurParams,
    draw,
    DrawParams,
    fade,
    FadeParams,
    fly,
    FlyParams,
    scale,
    ScaleParams,
    slide,
    SlideParams,
} from "svelte/transition";

export interface TransitionFunctions {
    blur: {
        fn: typeof blur;
        params: BlurParams;
    };
    fade: {
        fn: typeof fade;
        params: FadeParams;
    };
    fly: {
        fn: typeof fly;
        params: FlyParams;
    };
    slide: {
        fn: typeof slide;
        params: SlideParams;
    };
    scale: {
        fn: typeof scale;
        params: ScaleParams;
    };
    draw: {
        fn: typeof draw;
        params: DrawParams;
    };
}

export type TransitionKey = keyof TransitionFunctions;

export type ImgTransitionKey = Exclude<TransitionKey, "draw">;

export interface TransitionDef<T extends TransitionKey = TransitionKey> {
    fn: TransitionFunctions[T]["fn"];
    params?: TransitionFunctions[T]["params"];
}
