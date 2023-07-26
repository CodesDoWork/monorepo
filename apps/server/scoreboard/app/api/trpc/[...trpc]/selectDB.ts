import { getUser } from "./getUser";

export const selectDB = async (db: string): Promise<void> => {
    await getUser().then(user => user.update({ selectedDB: db }));
};
