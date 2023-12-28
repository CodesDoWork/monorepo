"use client";

import React, { useEffect, useRef, useState } from "react";
import {
    axisBottom,
    axisLeft,
    easeLinear,
    line,
    max,
    min,
    scaleLinear,
    ScaleLinear,
    scaleTime,
    ScaleTime,
    select,
    Selection,
} from "d3";

const ANIMATION_DURATION = 750;
const AXIS_OPACITY = 0.5;
const STROKE_WIDTH = 3;
const OFFSET_X = 32;
const OFFSET_Y = 16;
const Y_AXIS_TICKS = 5;
const Y_AXIS_PADDING_PERCENT = 0.1;

type Item = {
    x: number | Date;
    y: number;
};

type LineData = {
    name: string;
    colorClass: string;
    items: Item[];
};

type DataType = LineData[];

type MultilineChartProps = {
    data: DataType;
    width: number;
    height: number;
};

type MinMaxData = {
    minX: number | Date;
    maxX: number | Date;
    minY: number;
    maxY: number;
};

type Scales = {
    xScale: ScaleTime<number, number>;
    yScale: ScaleLinear<number, number>;
};

export const MultilineChart = ({ data, width, height }: MultilineChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [prevItems, setPrevItems] = useState<string[]>([]);

    const { minX, maxX, minY, maxY } = computeMinMax(data);

    useEffect(() => {
        const { xScale, yScale } = setupScales(minX, maxX, minY, maxY, width, height - OFFSET_Y);
        const svg = setupSvg(svgRef);
        setupAxis(svg, xScale, yScale, width, height);
        drawLines(svg, data, xScale, yScale, prevItems);
        setPrevItems(data.map(({ name }) => name));
    }, [data]);

    return <svg ref={svgRef} width={width + OFFSET_X} height={height} />;
};

const computeMinMax = (data: DataType): MinMaxData => {
    const allX = data.flatMap(d => d.items.map(item => item.x));
    const minX = min(allX) || 0;
    const maxX = max(allX) || 0;
    const allY = data.flatMap(d => d.items.map(item => item.y));
    const minY = Math.min(...allY);
    const maxY = Math.max(...allY);

    return { minX, maxX, minY, maxY };
};

const setupScales = (
    minX: number | Date,
    maxX: number | Date,
    minY: number,
    maxY: number,
    width: number,
    height: number,
): Scales => {
    const xScale = scaleTime()
        .domain([minX, maxX])
        .range([0, width - OFFSET_X]);
    const yScale = scaleLinear()
        .domain([minY, maxY + maxY * Y_AXIS_PADDING_PERCENT])
        .range([height - OFFSET_Y, 0]);
    return { xScale, yScale };
};

const setupSvg = (svgRef: React.RefObject<SVGSVGElement>) => {
    const svgEl = select(svgRef.current);
    svgEl.selectAll("*").remove();
    return svgEl.append("g").attr("transform", `translate(${OFFSET_X},0)`);
};

const setupAxis = (
    svg: Selection<SVGGElement, unknown, null, undefined>,
    xScale: ScaleTime<number, number>,
    yScale: ScaleLinear<number, number>,
    width: number,
    height: number,
): void => {
    const xAxis = axisBottom(xScale).tickSize(0);
    const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0,${height - OFFSET_Y})`)
        .call(xAxis);
    customizeAxis(xAxisGroup);

    const yAxis = axisLeft(yScale)
        .ticks(Y_AXIS_TICKS)
        .tickSize(-width + OFFSET_X);
    const yAxisGroup = svg.append("g").call(yAxis);
    customizeAxis(yAxisGroup);
};

const customizeAxis = (axisGroup: Selection<SVGGElement, unknown, null, undefined>): void => {
    axisGroup.select(".domain").remove();
    axisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
    axisGroup
        .selectAll("text")
        .attr("opacity", AXIS_OPACITY)
        .attr("color", "black")
        .attr("font-size", "0.75rem");
};

const drawLines = (
    svg: Selection<SVGGElement, unknown, null, undefined>,
    data: DataType,
    xScale: ScaleTime<number, number>,
    yScale: ScaleLinear<number, number>,
    prevItems: string[],
): void => {
    const lineFunc = line<Item>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
    const lines = svg
        .selectAll(".line")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke-width", STROKE_WIDTH)
        .attr("class", d => d.colorClass)
        .attr("d", d => lineFunc(d.items));
    animateLines(lines, prevItems);
};

const animateLines = (
    lines: Selection<SVGPathElement, LineData, SVGGElement, unknown>,
    prevItems: string[],
): void => {
    lines.each((d, i, nodes) => {
        const element = nodes[i];
        const length = element.getTotalLength();
        if (!prevItems.includes(d.name)) {
            select(element)
                .attr("stroke-dasharray", `${length},${length}`)
                .attr("stroke-dashoffset", length)
                .transition()
                .duration(ANIMATION_DURATION)
                .ease(easeLinear)
                .attr("stroke-dashoffset", 0);
        }
    });
};
