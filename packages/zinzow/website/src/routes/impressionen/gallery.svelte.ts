import type { DirectusImageParams } from "@cdw/monorepo/packages/shared/svelte/components/src";
import type { Video } from "../../components/impressions/types";
import type { PageData } from "./$types";

type Image = PageData["impressions"]["images"][number];

export function useGallery(images: Image[], videos: Video[], columns: number) {
    const columnsArray = Array.from({ length: columns }).map(() => [] as (Image | Video)[]);
    images.forEach((_, idx) => columnsArray[idx % columns].push(images[idx]));
    videos.forEach((_, idx) => columnsArray[(idx + images.length) % columns].push(videos[idx]));

    let showDialog = $state(false);

    let selectedItemCol = $state(0);
    let selectedItemRow = $state(0);
    const selectedItem = $derived(columnsArray[selectedItemCol][selectedItemRow]);
    function selectItem(col: number, row: number) {
        selectedItemCol = col;
        selectedItemRow = row;
    }

    let clickedSelectedCol = $state(selectedItemCol);
    let clickedSelectedRow = $state(selectedItemRow);
    const clickedSelectedItem = $derived(columnsArray[clickedSelectedCol][clickedSelectedRow]);
    function clickItem(col: number, row: number) {
        clickedSelectedCol = col;
        clickedSelectedRow = row;
    }

    const rotateRow = $derived((forwards: boolean = true) => {
        const nextRow = selectedItemRow + (forwards ? 1 : -1);
        const colLength = columnsArray[selectedItemCol].length;
        selectedItemRow = nextRow >= 0 ? nextRow % colLength : colLength - 1;
    });

    const rotateCol = $derived((forwards: boolean = true) => {
        const nextCol = selectedItemCol + (forwards ? 1 : -1);
        let selectedCol = nextCol >= 0 ? nextCol % columns : columns - 1;
        let selectedRow = selectedItemRow + (nextCol >= 0 ? Math.floor(nextCol / columns) : -1);

        if (selectedRow < 0) {
            const sortedColLengths = columnsArray
                .map((col, idx) => ({ length: col.length, idx }))
                .sort((a, b) => b.idx - a.idx)
                .sort((a, b) => b.length - a.length);
            const lastLongCol = sortedColLengths[0].idx;

            selectedCol = lastLongCol;
            selectedRow = columnsArray[lastLongCol].length - 1;
        } else if (selectedRow >= columnsArray[selectedCol].length) {
            selectedCol = 0;
            selectedRow = 0;
        }

        selectedItemCol = selectedCol;
        selectedItemRow = selectedRow;
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
            handle(() => rotateCol());
        } else if (event.key === "ArrowLeft") {
            handle(() => rotateCol(false));
        } else if (event.key === "ArrowUp") {
            handle(() => rotateRow(false));
        } else if (event.key === "ArrowDown") {
            handle(() => rotateRow());
        }
    });

    function resetSelectedItem() {
        selectedItemCol = clickedSelectedCol;
        selectedItemRow = clickedSelectedRow;
    }

    return {
        get selectedCol() {
            return selectedItemCol;
        },
        get selectedRow() {
            return selectedItemRow;
        },
        get selectedItem() {
            return selectedItem;
        },
        get clickedSelectedItem() {
            return clickedSelectedItem;
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
        get rotateRow() {
            return rotateRow;
        },
        get rotateCol() {
            return rotateCol;
        },
        columnsArray,
        selectItem,
        clickItem,
        resetSelectedItem,
    };
}

export function isImage(item: Image | Video): item is Image {
    return "src" in item;
}

export function isDirectusParams(item: DirectusImageParams | Video): item is DirectusImageParams {
    return "src" in item;
}
