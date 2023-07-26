"use client";

import { InlineActionInput, Label } from "shared/web/components";
import { useLogin } from "./useLogin";

type LoginProps = {
    onSuccess: () => void;
};

export function Login(props: LoginProps) {
    const { inputId, apiKey, setApiKey, error, onLogin } = useLogin(props);

    return (
        <>
            <Label htmlFor={inputId}>Login</Label>
            <InlineActionInput
                buttonProps={{ children: "✓", onClick: onLogin }}
                inputProps={{
                    id: inputId,
                    placeholder: "Notion API Key",
                    type: "password",
                    value: apiKey,
                    onChange: setApiKey,
                }}
                error={error}
            />
        </>
    );
}
