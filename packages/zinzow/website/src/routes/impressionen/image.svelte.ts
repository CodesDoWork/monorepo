import type { PageData } from "./$types";

export function useImages(images: PageData["impressions"]["images"], columns: number) {
    const columnsArray: (typeof images)[] = Array.from({ length: columns });
    let showDialog = $state(false);

    let selectedImageIdx = $state(0);
    const selectedImage = $derived(images[selectedImageIdx]);

    let clickedSelectedImageIdx = $state(selectedImageIdx);
    const clickedSelectedImage = $derived(images[clickedSelectedImageIdx]);

    const rotateImageBy = $derived((steps: number) => {
        let idx = selectedImageIdx + steps;
        const rows = Math.ceil(images.length / columns);

        if (idx < 0) {
            if (steps === -1) {
                idx = images.length - 1;
            } else {
                idx += Math.max(1, rows - 1) * columns;
            }
        }

        if (idx > images.length - 1) {
            if (steps === 1) {
                idx = 0;
            } else {
                idx -= Math.max(1, rows - 1) * columns;
            }
        }

        selectedImageIdx = idx;
    });

    const handleKey = $derived((event: KeyboardEvent) => {
        function handle(func: () => void) {
            event.preventDefault();
            func();
        }

        if (showDialog && event.key === "Escape") {
            handle(() => (showDialog = false));
        } else if (!showDialog && event.key === "Enter") {
            handle(() => (showDialog = true));
        }

        if (event.key === "ArrowRight") {
            handle(() => rotateImageBy(1));
        } else if (event.key === "ArrowLeft") {
            handle(() => rotateImageBy(-1));
        } else if (event.key === "ArrowUp") {
            handle(() => rotateImageBy(-columns));
        } else if (event.key === "ArrowDown") {
            handle(() => rotateImageBy(columns));
        }
    });

    function resetSelectedImg() {
        selectedImageIdx = clickedSelectedImageIdx;
    }

    return {
        get selectedImageIdx() {
            return selectedImageIdx;
        },
        set selectedImageIdx(value: number) {
            selectedImageIdx = value;
        },
        get selectedImage() {
            return selectedImage;
        },
        get clickedSelectedImageIdx() {
            return clickedSelectedImageIdx;
        },
        set clickedSelectedImageIdx(value: number) {
            clickedSelectedImageIdx = value;
        },
        get clickedSelectedImage() {
            return clickedSelectedImage;
        },
        get showDialog() {
            return showDialog;
        },
        set showDialog(value: boolean) {
            showDialog = value;
        },
        get handleKey() {
            return handleKey;
        },
        get rotateImageBy() {
            return rotateImageBy;
        },
        columnsArray,
        images,
        resetSelectedImg,
    };
}
