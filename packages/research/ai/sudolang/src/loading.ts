import ora, { Ora } from "ora";

let spinner: Ora | null = null;

export async function load<T>(
    loadingText: string,
    task: Promise<T>,
    finishCallback?: () => Promise<string>,
): Promise<T> {
    spinner = ora(loadingText).start();
    const result = await task.catch((e: Error) => {
        failLoading(e.message);
        throw e;
    });

    finishCallback
        ? await finishCallback().then(finishLoading).catch(failLoading)
        : finishLoading();

    return result;
}

export function setLoadingText(text: string) {
    spinner && (spinner.text = text);
}

export function finishLoading(msg?: string) {
    spinner && spinner.succeed(msg);
}

export function failLoading(msg?: string) {
    spinner && spinner.fail(msg);
}

export function setLoadingSuffix(text: string) {
    spinner && (spinner.suffixText = `| ${text}`);
}
