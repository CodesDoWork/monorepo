import { InlineActionInput, Label } from "shared/web/components";
import { HTMLProps } from "react";

type LoginProps = HTMLProps<HTMLDivElement>;

export function Login(props: LoginProps) {
    const inputId = "notion-api-key";

    return (
        <div {...props}>
            <Label htmlFor={inputId}>Login</Label>
            <InlineActionInput
                buttonProps={{ children: "✓" }}
                inputProps={{ id: inputId, placeholder: "Notion API Key" }}
            />
        </div>
    );
}
