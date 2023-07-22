import { Center, InlineActionInput, Label } from "shared/web/components";

export function Login() {
    const inputId = "notion-api-key";

    return (
        <Center>
            <Label htmlFor={inputId}>Login</Label>
            <InlineActionInput
                buttonProps={{ children: "✓" }}
                inputProps={{ id: inputId, placeholder: "Notion API Key" }}
            />
        </Center>
    );
}
