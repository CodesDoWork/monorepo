import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { RunSubmitToolOutputsParams } from "openai/resources/beta/threads/index.mjs";
import { Run } from "openai/src/resources/beta/threads/index.js";
import { load } from "./loading";
import { AssistantState, createOpenAIAssistant } from "./openai/assistant";
import { openaiClient } from "./openai/client";
import { getProjectConfig } from "./project/config";
import { forEachProjectFile } from "./project/tree";

export async function transpileSudoLangProject(dir: string) {
    const assistantState = await load("Setting up assistant", createOpenAIAssistant());
    await load("Setting up project", setupProject(dir, assistantState), () =>
        getAnswer(assistantState),
    );
    await transpileFilesSrcDirectory(dir, assistantState);
}

async function setupProject(dir: string, assistantState: AssistantState) {
    const { assistantId, threadId } = assistantState;
    const config = await getProjectConfig(dir);
    openaiClient.beta.threads.messages.create(threadId, {
        role: "user",
        content: `/setup \`\`\`\n${JSON.stringify(config, null, 2)}\`\`\``,
    });

    await handleRun(
        dir,
        await openaiClient.beta.threads.runs.createAndPoll(threadId, {
            assistant_id: assistantId,
        }),
    );
}

async function transpileFilesSrcDirectory(dir: string, assistantState: AssistantState) {
    await forEachProjectFile(dir, async (dirPath, item) => {
        if (item.isFile() && item.name.endsWith(".sudo")) {
            await transpileFile(dir, dirPath, item.name, assistantState);
        }
    });
}

async function transpileFile(
    projectDir: string,
    dirPath: string,
    file: string,
    assistantState: AssistantState,
) {
    const { assistantId, threadId } = assistantState;
    const filePath = path.join(path.relative(projectDir, dirPath), file);
    const fileContent = readFileSync(path.join(dirPath, file), "utf-8").toString();
    openaiClient.beta.threads.messages.create(threadId, {
        role: "user",
        content: `/implement \`${filePath}\`: \`\`\`\n${fileContent}\`\`\``,
    });

    await load(
        `Transpiling file ${filePath}`,
        handleRun(
            projectDir,
            await openaiClient.beta.threads.runs.createAndPoll(threadId, {
                assistant_id: assistantId,
            }),
        ),
        () => getAnswer(assistantState),
    );
}

async function getAnswer({ threadId }: AssistantState): Promise<string> {
    const messages = await openaiClient.beta.threads.messages.list(threadId);
    return (messages.data[0]?.content[0] as any)?.text?.value;
}

async function handleRun(projectDir: string, run: Run) {
    if (run.status === "completed") {
        while (run.completed_at === null) {
            run = await openaiClient.beta.threads.runs.retrieve(run.thread_id, run.id);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    } else if (run.status === "requires_action") {
        const newRun = await handleRequiresAction(projectDir, run);
        if (newRun) {
            await handleRun(projectDir, newRun);
        }
    } else {
        throw new Error("Run did not complete");
    }
}

type ToolArguments = {
    filepath: string;
    content: string;
};

async function handleRequiresAction(projectDir: string, run: Run) {
    if (
        run.required_action &&
        run.required_action.submit_tool_outputs &&
        run.required_action.submit_tool_outputs.tool_calls
    ) {
        const toolOutputs: RunSubmitToolOutputsParams.ToolOutput[] = [];
        run.required_action.submit_tool_outputs.tool_calls.forEach(tool => {
            if (tool.function.name === "createFile") {
                const { filepath, content } = JSON.parse(tool.function.arguments) as ToolArguments;
                const generatedFilepath = path.join(
                    projectDir,
                    filepath.startsWith("generated") ? "" : "generated",
                    filepath,
                );
                mkdirSync(path.dirname(generatedFilepath), { recursive: true });
                writeFileSync(generatedFilepath, content);

                toolOutputs.push({
                    tool_call_id: tool.id,
                    output: "File created successfully",
                });
            }
        });

        if (toolOutputs.length > 0) {
            run = await openaiClient.beta.threads.runs.submitToolOutputsAndPoll(
                run.thread_id,
                run.id,
                {
                    tool_outputs: toolOutputs,
                },
            );
            return run;
        }
    }

    return undefined;
}
