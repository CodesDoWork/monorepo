"use client";

import { ChangeEventHandler, useCallback, useState } from "react";
import { Button, PropsWithClassName } from "shared/web/components";
import { trpc } from "../app/trpc";
import clsx from "clsx";

export function DownloadForm({ className }: PropsWithClassName<object>) {
    const [url, setURL] = useState("");
    const onUrlChange: ChangeEventHandler<HTMLInputElement> = useCallback(
        e => setURL(e.target.value),
        [setURL],
    );

    const download = useCallback(() => {
        trpc.download.query({ url }).catch(e => alert(JSON.parse(e.message)[0].message));
    }, [url]);

    const containerClassName = clsx("flex w-1/2", className);
    const inputClassName = clsx("rounded-md h-10 w-full");
    const buttonClassName = clsx(
        "ml-4 w-48 h-10 rounded-md",
        "text-onPrimary text-xl font-bold",
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-500",
    );

    return (
        <div className={containerClassName}>
            <input
                className={inputClassName}
                placeholder="URL"
                value={url}
                onChange={onUrlChange}
            />
            <Button className={buttonClassName} onClick={download}>
                Download
            </Button>
        </div>
    );
}
