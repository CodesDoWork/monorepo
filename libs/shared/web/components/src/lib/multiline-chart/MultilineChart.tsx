"use client";

import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";
import { ScaleLinear, ScaleTime, Selection } from "d3";

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

const offsetX = 32;
const offsetY = 16;

export const MultilineChart = ({ data, width, height }: MultilineChartProps) => {
    const svgRef = useRef<SVGSVGElement>(null);
    const [prevItems, setPrevItems] = useState<string[]>([]);

    const { minX, maxX, minY, maxY } = computeMinMax(data);

    useEffect(() => {
        const { xScale, yScale } = setupScales(minX, maxX, minY, maxY, width, height - offsetY);
        const svg = setupSvg(svgRef);
        setupAxis(svg, xScale, yScale, width, height);
        drawLines(svg, data, xScale, yScale, prevItems);
        setPrevItems(data.map(({ name }) => name));
    }, [data]);

    return <svg ref={svgRef} width={width + offsetX} height={height} />;
};

const computeMinMax = (data: DataType): MinMaxData => {
    const allX = data.flatMap(d => d.items.map(item => item.x));
    const minX = d3.min(allX) || 0;
    const maxX = d3.max(allX) || 0;
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
    const xScale = d3
        .scaleTime()
        .domain([minX, maxX])
        .range([0, width - offsetX]);
    const yScale = d3
        .scaleLinear()
        .domain([minY, maxY + maxY * 0.1])
        .range([height - offsetY, 0]);
    return { xScale, yScale };
};

const setupSvg = (svgRef: React.RefObject<SVGSVGElement>) => {
    const svgEl = d3.select(svgRef.current);
    svgEl.selectAll("*").remove();
    return svgEl.append("g").attr("transform", `translate(${offsetX},0)`);
};

const setupAxis = (
    svg: Selection<SVGGElement, unknown, null, undefined>,
    xScale: ScaleTime<number, number>,
    yScale: ScaleLinear<number, number>,
    width: number,
    height: number,
): void => {
    const xAxis = d3.axisBottom(xScale).tickSize(0);
    const xAxisGroup = svg
        .append("g")
        .attr("transform", `translate(0,${height - offsetY})`)
        .call(xAxis);
    customizeAxis(xAxisGroup);

    const yAxis = d3
        .axisLeft(yScale)
        .ticks(5)
        .tickSize(-width + offsetX);
    const yAxisGroup = svg.append("g").call(yAxis);
    customizeAxis(yAxisGroup);
};

const customizeAxis = (axisGroup: Selection<SVGGElement, unknown, null, undefined>): void => {
    axisGroup.select(".domain").remove();
    axisGroup.selectAll("line").attr("stroke", "rgba(0, 0, 0, 0.2)");
    axisGroup
        .selectAll("text")
        .attr("opacity", 0.5)
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
    const line = d3
        .line<Item>()
        .x(d => xScale(d.x))
        .y(d => yScale(d.y));
    const lines = svg
        .selectAll(".line")
        .data(data)
        .enter()
        .append("path")
        .attr("fill", "none")
        .attr("stroke-width", 3)
        .attr("class", d => d.colorClass)
        .attr("d", d => line(d.items));
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
            d3.select(element)
                .attr("stroke-dasharray", `${length},${length}`)
                .attr("stroke-dashoffset", length)
                .transition()
                .duration(750)
                .ease(d3.easeLinear)
                .attr("stroke-dashoffset", 0);
        }
    });
};
