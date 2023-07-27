import { getUser } from "./getUser";
import { selectDB } from "./selectDB";
import { setApiKey } from "./setApiKey";

export const goBack = async () => {
    const user = await getUser();
    if (user.selectedDB) {
        await selectDB("");
    } else if (user.notionApiKey) {
        await setApiKey("");
    }
};
