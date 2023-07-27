"use client";

import React from "react";
import { useLegend, UseLegendProps } from "./useLegend";
import { clsx } from "clsx";

type LegendProps = UseLegendProps & {
    data: {
        name: string;
        colorClass: string;
    }[];
    className?: string;
};

export const Legend = ({ data, className, ...useLegendProps }: LegendProps) => {
    const { isChecked, onCheckedChange } = useLegend(useLegendProps);

    return (
        <div className={clsx("flex flex-wrap gap-3", className)}>
            {data.map(({ name, colorClass }) => (
                <div key={name} className="flex items-center">
                    {name !== "Portfolio" && (
                        <input
                            className={`h-4 w-4 mr-1 rounded border-gray-300 !ring-offset-0 !ring-0 ${colorClass}`}
                            type="checkbox"
                            value={name}
                            checked={isChecked(name)}
                            onChange={() => onCheckedChange(name)}
                        />
                    )}
                    <label>{name}</label>
                </div>
            ))}
        </div>
    );
};
