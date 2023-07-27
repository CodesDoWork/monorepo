import { useCallback, useEffect, useState } from "react";
import { Stage } from "../../types/types";
import { trpc } from "../../app/trpc";

export const useContent = () => {
    const [stage, setStage] = useState(Stage.Login);

    const update = useCallback(() => {
        trpc.getStage.query({}).then(res => setStage(res.stage));
    }, [setStage]);

    useEffect(update, [update]);

    const goBack = useCallback(async () => {
        await trpc.goBack.query({}).then(update);
    }, [update]);

    return { stage, update, goBack };
};
