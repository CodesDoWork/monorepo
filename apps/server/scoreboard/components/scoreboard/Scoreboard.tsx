import { Counter, useScoreboard } from "./useScoreboard";
import { PropsWithChildren } from "react";
import clsx from "clsx";
import { Legend, Loader, MultilineChart } from "shared/web/components";
import { useElementSize } from "usehooks-ts";

export function Scoreboard() {
    const { dbInfo, counters, chartData, selectedCounters, setSelectedCounters } = useScoreboard();
    const [chartRef, { width, height }] = useElementSize();

    return (
        <div className="m-8">
            <h1 className="text-center mb-6 font-bold text-2xl">{dbInfo?.name}</h1>
            <div className="mb-8 flex flex-wrap justify-evenly">{counters.map(Counter)}</div>
            <div className="flex items-center justify-center" ref={chartRef}>
                <MultilineChart
                    width={width * 0.6}
                    height={height * 0.75}
                    data={chartData.filter(item => selectedCounters.includes(item.name))}
                />
                <Legend
                    className="ml-10 flex-col gap-1"
                    data={chartData}
                    selectedItems={selectedCounters}
                    onChange={setSelectedCounters}
                />
            </div>
        </div>
    );
}

const Counter = ({ name, value, increment, decrement, isLoading }: Counter) => {
    return (
        <div className="flex flex-col w-32 p-4 items-center justify-between">
            <span className="text-center">{name}</span>
            <span className="mb-2 text-xl text-center font-light">
                {isLoading ? <Loader className="w-5 h-5" /> : value}
            </span>
            <div className="flex gap-2">
                <CounterButton onClick={decrement} disabled={isLoading}>
                    -
                </CounterButton>
                <CounterButton onClick={increment} disabled={isLoading}>
                    +
                </CounterButton>
            </div>
        </div>
    );
};

type CounterButtonProps = {
    onClick: () => void;
    disabled?: boolean;
};
const CounterButton = (props: PropsWithChildren<CounterButtonProps>) => {
    const className = clsx(
        "w-10 h-10 rounded-md",
        "text-onPrimary text-xl font-bold",
        "bg-primary-500 hover:bg-primary-400 active:bg-primary-500",
    );

    return <button className={className} {...props} />;
};
