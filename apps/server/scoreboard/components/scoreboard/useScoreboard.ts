import { useEffect, useMemo, useState } from "react";
import { trpc } from "../../app/trpc";
import { getIsoDate } from "shared/web/utils";

export const useScoreboard = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [loadingCounters, setLoadingCounters] = useState<string[]>([]);
    const [dbInfo, setDbInfo] = useState<DBInfo>();
    const [dbData, setDbData] = useState<DBData>({});
    const [counters, setCounters] = useState<Counter[]>([]);
    const [selectedCounters, setSelectedCounters] = useState<string[]>([]);

    useEffect(() => {
        trpc.getDB.query({}).then(({ name, dateProperty, properties, pages }) => {
            setDbInfo({ name, dateProperty, properties });

            const newData: DBData = {};
            pages.forEach(page => {
                let date: string | null = null;
                const dbProperties: Record<string, DBProperty> = {};
                Object.entries(page.properties).forEach(([propName, prop]) => {
                    if ("number" in prop) {
                        dbProperties[propName] = {
                            name: propName,
                            value: prop.number ?? 0,
                        };
                    } else if ("date" in prop) {
                        const propDate = prop.date?.start;
                        if (propDate) {
                            date = propDate;
                        }
                    }
                });

                if (date) {
                    newData[date] = dbProperties;
                }
            });

            setDbData(newData);
        });
    }, [setDbInfo, setDbData]);

    useEffect(() => {
        if (!dbInfo) {
            return;
        }

        const today = getIsoDate(new Date());
        const todayProperties = dbData[today] || [];
        setCounters(
            dbInfo.properties
                .sort((p1, p2) => p1.localeCompare(p2))
                .map(propName => {
                    const updateProperty = async (add: number) => {
                        setLoadingCounters(old => [...old, propName]);
                        const res = await trpc.updateProperty.query({ propName, add });

                        if (todayProperties[propName]) {
                            todayProperties[propName].value = res.value;
                        } else {
                            todayProperties[propName] = {
                                name: propName,
                                value: res.value,
                            };
                        }
                        setDbData({ ...dbData, [today]: todayProperties });

                        setLoadingCounters(old => old.filter(name => name !== propName));
                    };

                    return {
                        name: propName,
                        value: todayProperties[propName]?.value ?? 0,
                        increment: () => updateProperty(1),
                        decrement: () => updateProperty(-1),
                        isLoading: loadingCounters.includes(propName),
                    };
                }),
        );
    }, [dbInfo, dbData, setCounters, setLoadingCounters, loadingCounters]);

    const chartData = useMemo(() => {
        const today = getIsoDate(new Date());
        return counters.map((counter, idx) => ({
            name: counter.name,
            colorClass: chartColors[idx % chartColors.length],
            items: Object.entries(dbData)
                .map(([date, properties]) => ({
                    x: new Date(date),
                    y: date === today ? counter.value : properties[counter.name]?.value ?? 0,
                }))
                .sort((i1, i2) => (i1.x < i2.x ? -1 : 1)),
        }));
    }, [counters, dbData]);

    useEffect(() => {
        setSelectedCounters(chartData.map(d => d.name));
        setIsLoading(false);
    }, [chartData, setSelectedCounters, setIsLoading]);

    return { dbInfo, counters, selectedCounters, setSelectedCounters, chartData, isLoading };
};

type DBInfo = {
    name: string;
    dateProperty: string;
    properties: string[];
};

type DBData = Record<string, Record<string, DBProperty>>;

type DBProperty = {
    name: string;
    value: number;
};

export type Counter = {
    name: string;
    value: number;
    increment: () => void;
    decrement: () => void;
    isLoading: boolean;
};

const chartColors = [
    "text-stone-500 stroke-stone-500",
    "text-red-500 stroke-red-500",
    "text-orange-500 stroke-orange-500",
    "text-yellow-500 stroke-yellow-500",
    "text-lime-500 stroke-lime-500",
    "text-green-500 stroke-green-500",
    "text-sky-500 stroke-sky-500",
    "text-blue-500 stroke-blue-500",
    "text-indigo-500 stroke-indigo-500",
    "text-violet-500 stroke-violet-500",
    "text-fuchsia-500 stroke-fuchsia-500",
    "text-rose-500 stroke-rose-500",
];
