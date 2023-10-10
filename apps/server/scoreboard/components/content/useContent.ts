import { useCallback, useEffect, useState } from "react";
import { Stage } from "../../types/types";
import { trpc } from "../../app/trpc";
import { signOut } from "next-auth/react";
import { env } from "../../app/env";

export const useContent = () => {
    const [stage, setStage] = useState(Stage.Loading);

    const update = useCallback(() => {
        setStage(Stage.Loading);
        trpc.getStage.query({}).then(res => setStage(res.stage));
    }, [setStage]);

    useEffect(update, [update]);

    const goBack = useCallback(async () => {
        setStage(Stage.Loading);
        await trpc.goBack.query({}).then(update);
    }, [update]);

    return { stage, update, goBack };
};
