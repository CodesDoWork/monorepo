import { useCallback, useId, useState } from "react";
import { trpc } from "../../app/trpc";
import { TRPCClientError } from "@trpc/client";
import { AppRouter } from "../../app/api/trpc/[...trpc]/route";

const invalidApiKeyMsg = "Invalid API Key";
const serverErrorMsg = "Internal Server Error";

export type UseLoginProps = {
    onSuccess: () => void;
};

export const useLogin = ({ onSuccess }: UseLoginProps) => {
    const inputId = useId();

    const [apiKey, setApiKey] = useState("");
    const [error, setError] = useState("");

    const onLogin = useCallback(() => {
        return trpc.setApiKey
            .query({ key: apiKey })
            .then(async ({ isValidKey }) => {
                if (isValidKey) {
                    setError("");
                    onSuccess();
                } else {
                    setError(invalidApiKeyMsg);
                }
            })
            .catch((e: TRPCClientError<AppRouter>) => {
                const httpStatus = e.data?.httpStatus || 500;
                const isBadRequest = 400 <= httpStatus && httpStatus < 500;
                setError(isBadRequest ? invalidApiKeyMsg : serverErrorMsg);
            });
    }, [apiKey, onSuccess, setError]);

    return { inputId, apiKey, setApiKey, error, onLogin };
};
