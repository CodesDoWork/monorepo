import type { BSLItem } from "./bsl-item/bsl-item";

export function getBSLData() {
    let data = $state<BSLItem[]>([]);
    let isLoading = $state(true);

    $effect(() => {
        import("../../service-worker/index?worker").then(({ default: Worker }) => {
            const worker = new Worker();
            worker.onmessage = event => {
                data = event.data;
                isLoading = false;
            };

            worker.postMessage("start");
        });
    });

    return {
        get isLoading() {
            return isLoading;
        },
        get data() {
            return data;
        },
    };
}
