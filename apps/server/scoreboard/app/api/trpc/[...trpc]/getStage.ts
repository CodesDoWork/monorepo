import { z } from "zod";
import { getUser } from "./getUser";
import { Stage } from "../../../../types/types";

export const stageType = z.nativeEnum(Stage);

export const getStage = async (): Promise<Stage> => {
    const user = await getUser().catch(() => null);
    if (!user || !user.notionApiKey) {
        return Stage.Login;
    } else if (!user.selectedDB) {
        return Stage.DbSelection;
    } else {
        return Stage.Scoreboard;
    }
};
