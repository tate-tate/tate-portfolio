import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/d3vis.module.css";
import { EF_SCALE_COLORS } from "./TornadoMap"; // steal color scale from the map

const TimelineChart = ({ data }) => {
    const chartRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;

        const margin = { top: 20, right: 30, bottom: 50, left: 50 };
        const width = 800 - margin.left - margin.right;
        const height = 300 - margin.top - margin.bottom;

        const svg = d3.select(chartRef.current)
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // hover tooltip
        const tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("position", "absolute")
            .style("opacity", 0)
            .style("background", "var(--tooltip-bg-color)")
            .style("color", "var(--tooltip-text-color)")
            .style("border", "1px solid var(--tooltip-border-color)") 
            .style("border-radius", "5px")
            .style("padding", "5px")
            .style("pointer-events", "none")
            .style("font-size", "12px");

        // parse and group data by month and strength
        const parseDate = d3.timeParse("%Y%m");
        const groupedData = d3.rollups(
            data,
            (v) => v.length,
            (d) => parseDate(d.BEGIN_YEARMONTH),
            (d) => d.TOR_F_SCALE
        ).map(([date, strengths]) => [date, new Map(strengths || [])]);

        const months = Array.from(new Set(data.map(d => parseDate(d.BEGIN_YEARMONTH)))).sort(d3.ascending);

        // Scales
        const x = d3.scaleTime()
            .domain(d3.extent(months))
            .range([0, width]);

        const y = d3.scaleLinear()
            .domain([0, d3.max(groupedData, ([, strengths]) => d3.sum(Array.from(strengths.values())))]).nice()
            .range([height, 0]);

        const color = d3.scaleOrdinal()
            .domain(EF_SCALE_COLORS.map((d) => d.scale))
            .range(EF_SCALE_COLORS.map((d) => d.color));

        // Axes
        svg.append("g")
            .attr("class", "x-axis")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(d3.timeMonth.every(1)).tickFormat(d3.timeFormat("%b")))
            .selectAll("text")
            .attr("class", "axis-text")
            .style("font-size", "12px");

        svg.append("g")
            .attr("class", "y-axis")
            .call(d3.axisLeft(y).ticks(5))
            .selectAll("text")
            .attr("class", "axis-text")
            .style("font-size", "12px"); 

        svg.selectAll(".domain, .tick line") 
            .attr("class", "axis-line");

        // Stacked data
        const stack = d3.stack()
            .keys(EF_SCALE_COLORS.map((d) => d.scale))
            .value(([, strengths], key) => strengths.get(key) || 0);

        const series = stack(groupedData);

        // Draw bars
        const barWidth = x(new Date(2024, 1)) - x(new Date(2024, 0)) - 4; // alignment fix
        svg.append("g")
            .selectAll("g")
            .data(series)
            .join("g")
            .attr("fill", (d) => color(d.key))
            .selectAll("rect")
            .data((d) => d.map((v) => ({ ...v, key: d.key }))) // ef scale key
            .join("rect")
            .attr("x", (d) => x(d.data[0]) + 2) // fix alignment
            .attr("y", (d) => y(d[1]))
            .attr("height", (d) => y(d[0]) - y(d[1]))
            .attr("width", barWidth)
            .on("mouseover", (event, d) => {
                tooltip.style("opacity", 1)
                    .html(`
                        <strong>EF Scale:</strong> ${d.key}<br>
                        <strong>Count:</strong> ${d[1] - d[0]}<br>
                        <strong>Month:</strong> ${d3.timeFormat("%B %Y")(d.data[0])}
                    `);
            })
            .on("mousemove", (event) => {
                tooltip.style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on("mouseout", () => {
                tooltip.style("opacity", 0);
            });

        // Legend
        const legend = svg.append("g")
            .attr("transform", `translate(${width - 100}, 0)`);

        legend.selectAll("rect")
            .data(color.domain())
            .join("rect")
            .attr("x", 0)
            .attr("y", (d, i) => i * 20)
            .attr("width", 18)
            .attr("height", 18)
            .attr("fill", color);

        legend.selectAll("text")
            .data(color.domain())
            .join("text")
            .attr("x", 24)
            .attr("y", (d, i) => i * 20 + 9)
            .attr("dy", "0.35em")
            .style("fill", "var(--legend-text-color)")
            .text((d) => d);

        return () => {
            tooltip.remove();
        };
    }, [data]);

    return (
        <div className="tornado-map-container">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Stacked Bars - Tornadic Events by Month - Interactive</h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                This chart shows the number of tornadoes by month, stacke by EF scale. Hover over the bars to see details.
            </p>
            <div className="timeline-chart-wrapper">
                <svg ref={chartRef}></svg>
            </div>
        </div>
    );
};

export default TimelineChart;
