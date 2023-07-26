import { useEffect, useState } from "react";
import { trpc } from "../../app/trpc";

export const useScoreboard = () => {
    const [dbData, setDbData] = useState<DBData>({});

    useEffect(() => {
        trpc.getDB.query({}).then(pages => {
            const newData: DBData = {};
            pages.forEach(page => {
                let date: string | null = null;
                const properties: DBProperty[] = [];
                Object.entries(page.properties).forEach(([name, prop]) => {
                    if ("number" in prop) {
                        properties.push({
                            name,
                            id: prop.id,
                            value: prop.number ?? 0,
                        });
                    } else if ("date" in prop) {
                        const propDate = prop.date?.start;
                        if (propDate) {
                            date = propDate;
                        }
                    }
                });

                if (date) {
                    newData[date] = properties;
                }
            });

            setDbData(newData);
        });
    }, [setDbData]);

    return { dbData };
};

type DBData = Record<string, DBProperty[]>;

type DBProperty = {
    name: string;
    id: string;
    value: number;
};
