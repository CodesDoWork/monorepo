"use client";

import { InlineActionInput, Label } from "shared/web/components";
import { HTMLProps, useCallback, useState } from "react";
import { trpc } from "../../app/trpc";

type LoginProps = HTMLProps<HTMLDivElement>;

export function Login(props: LoginProps) {
    const inputId = "notion-api-key";

    const [value, setValue] = useState("");

    const onLogin = useCallback(() => {
        trpc.setApiKey.query({ key: value }).then(console.log);
    }, [value]);

    return (
        <div {...props}>
            <Label htmlFor={inputId}>Login</Label>
            <InlineActionInput
                buttonProps={{ children: "✓", onClick: onLogin }}
                inputProps={{
                    id: inputId,
                    placeholder: "Notion API Key",
                    value,
                    onChange: e => setValue((e.target as HTMLInputElement).value),
                }}
            />
        </div>
    );
}
