import { useCallback } from "react";

export type UseLegendProps = {
    selectedItems: string[];
    onChange: (selectedItems: string[]) => void;
};

export const useLegend = ({ selectedItems, onChange }: UseLegendProps) => {
    const onCheckedChange = useCallback(
        (name: string) => {
            onChange(
                selectedItems.includes(name)
                    ? selectedItems.filter(item => item !== name)
                    : [...selectedItems, name],
            );
        },
        [onChange, selectedItems],
    );

    const isChecked = useCallback((name: string) => selectedItems.includes(name), [selectedItems]);

    return { isChecked, onCheckedChange };
};
