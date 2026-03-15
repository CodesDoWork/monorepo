import type { DirectusImageParams } from "@cdw/monorepo/packages/shared/svelte/components/src";
import type { Video } from "../../components/impressions/types";
import type { PageData } from "./$types";

type Image = PageData["impressions"]["images"][number];
type Item = Image | Video;

export function useGallery(images: Image[], videos: Video[], columns: number) {
    const columnsArray = buildColumns(images, videos, columns);

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

    let showDialog = $state(false);

    const rotateRow = $derived((forwards = true) => {
        const nextRow = selectedItemRow + (forwards ? 1 : -1);
        const colLength = columnsArray[selectedItemCol].length;
        selectedItemRow = nextRow >= 0 ? nextRow % colLength : colLength - 1;
    });

    const rotateCol = $derived((forwards = true) => {
        const nextCol = selectedItemCol + (forwards ? 1 : -1);
        const nextItem = selectNextCol(nextCol, selectedItemRow, columnsArray);
        selectedItemCol = nextItem.selectedCol;
        selectedItemRow = nextItem.selectedRow;
    });

    const handleKey = $derived((event: KeyboardEvent) => {
        const handle = preventDefaultIfHandled(event);
        const handlers: Record<string, () => void> = {
            ArrowRight: () => rotateCol(true),
            ArrowLeft: () => rotateCol(false),
            ArrowUp: () => rotateRow(false),
            ArrowDown: () => rotateRow(true),
            Escape: () => (showDialog = false),
            Enter: () => (showDialog = true),
        };
        handle(handlers[event.key]);
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

function buildColumns(images: Image[], videos: Video[], columns: number): Item[][] {
    const cols: Item[][] = Array.from({ length: columns }, () => [] as Item[]);
    [...images, ...videos].forEach((item, index) => {
        cols[index % columns].push(item);
    });

    return cols;
}

function selectNextCol(nextCol: number, selectedItemRow: number, columnsArray: Item[][]) {
    const columns = columnsArray.length;
    const selectedCol = nextCol >= 0 ? nextCol % columns : columns - 1;
    const selectedRow = selectedItemRow + (nextCol >= 0 ? Math.floor(nextCol / columns) : -1);
    return ensureBounds(selectedRow, selectedCol, columnsArray);
}

function ensureBounds(selectedRow: number, selectedCol: number, columnsArray: Item[][]) {
    if (selectedRow < 0) {
        const lastLongesCol = getLasLongestCol(columnsArray);
        selectedCol = lastLongesCol;
        selectedRow = columnsArray[lastLongesCol].length - 1;
    } else if (selectedRow >= columnsArray[selectedCol].length) {
        selectedCol = 0;
        selectedRow = 0;
    }

    return { selectedCol, selectedRow };
}

function getLasLongestCol(columnsArray: Item[][]) {
    const sortedColLengths = columnsArray
        .map((col, idx) => ({ length: col.length, idx }))
        .sort((a, b) => b.idx - a.idx)
        .sort((a, b) => b.length - a.length);
    return sortedColLengths[0].idx;
}

function preventDefaultIfHandled(event: Event) {
    return function (func?: () => void) {
        if (func) {
            event.preventDefault();
            func();
        }
    };
}

export function isImage(item: Image | Video): item is Image {
    return "src" in item;
}

export function isDirectusParams(item: DirectusImageParams | Video): item is DirectusImageParams {
    return "src" in item;
}
