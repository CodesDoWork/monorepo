"use client";

import { InlineActionInput, Label, Loader } from "shared/web/components";
import { useDbSelection } from "./useDbSelection";

type DbSelectionProps = {
    onSuccess: () => void;
};

export function DbSelection(props: DbSelectionProps) {
    const { inputId, dbOptions, value, setValue, onSelect, isLoading } = useDbSelection(props);

    if (isLoading) {
        return <Loader className="w-8 h-8" />;
    }

    return (
        <>
            <Label htmlFor={inputId}>Select a Database</Label>
            <InlineActionInput
                buttonProps={{ children: "✓", onClick: onSelect }}
                inputProps={{
                    id: inputId,
                    placeholder: "Notion API Key",
                    type: "password",
                    value: value,
                    onChange: setValue,
                    options: dbOptions,
                }}
            />
        </>
    );
}
