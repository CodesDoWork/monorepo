import { readFileSync } from "node:fs";
import path from "node:path";
import { openaiClient } from "./client";

export interface AssistantState {
    assistantId: string;
    threadId: string;
}

export async function createOpenAIAssistant(): Promise<AssistantState> {
    const assistant = await openaiClient.beta.assistants.create({
        name: "SudoLang Code Generator",
        instructions: readFileSync(path.join(__dirname, "./instructions.sudo"), "utf-8").toString(),
        temperature: 0,
        tools: [
            {
                type: "function",
                function: {
                    name: "createFile",
                    description: "Create a new file",
                    parameters: {
                        type: "object",
                        properties: {
                            filepath: {
                                type: "string",
                                description:
                                    "The path to the file including filename and extension",
                            },
                            content: {
                                type: "string",
                                description: "The content of the file",
                            },
                        },
                        required: ["filepath", "content"],
                        additionalProperties: false,
                    },
                    strict: true,
                },
            },
        ],
        model: "gpt-4o",
    });

    const thread = await openaiClient.beta.threads.create();

    return { assistantId: assistant.id, threadId: thread.id };
}
