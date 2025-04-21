import { cubicOut } from "svelte/easing";
import { Tween } from "svelte/motion";

interface BaseChartData<T = unknown> {
    name: string;
    color: string;
    info?: T;
}

export interface ChartInputData<T = unknown> extends BaseChartData<T> {
    value?: number;
    startValue?: number;
}

export interface ChartData<T = unknown> extends BaseChartData<T> {
    value: Tween<number>;
}

type TweenOptions<T> = ConstructorParameters<typeof Tween<T>>[1];
const tweenOptions: TweenOptions<number> = {
    duration: 650,
    easing: cubicOut,
};

export function getChartData<T = unknown>(data: ChartInputData<T>[]): ChartData<T>[] {
    const result = data.map(({ name, color, startValue = 0, info }) => ({
        name,
        color,
        info,
        value: new Tween(startValue, tweenOptions),
    }));

    data.forEach(({ value = 0 }, index) => result[index].value.set(value));

    return result;
}
