import { useEffect, useRef } from "react";
import * as d3 from "d3";
import "../styles/d3vis.module.css";
import { EF_SCALE_COLORS } from "./TornadoMap"; // steal color scale from the map

const TimelineChart = ({ data }) => {
    const chartRef = useRef();
    const wrapperRef = useRef();

    useEffect(() => {
        if (!data || data.length === 0) return;
        const renderChart = () => {
            d3.select(chartRef.current).selectAll("*").remove();

            const containerWidth = wrapperRef.current?.clientWidth || 800;
            const margin = { top: 20, right: 140, bottom: 50, left: 50 };
            const width = Math.max(640, containerWidth - margin.left - margin.right);
            const height = 360 - margin.top - margin.bottom;

            const svg = d3.select(chartRef.current)
                .attr("viewBox", `0 0 ${width + margin.left + margin.right} ${height + margin.top + margin.bottom}`)
                .attr("preserveAspectRatio", "xMidYMid meet")
                .style("width", "100%")
                .style("height", "auto")
                .append("g")
                .attr("transform", `translate(${margin.left},${margin.top})`);

            const tooltip = d3.select("body").append("div")
                .attr("class", "tooltip")
                .style("position", "absolute")
                .style("opacity", 0)
                .style("pointer-events", "none")
                .style("font-size", "12px");

            const parseDate = d3.timeParse("%Y%m");
            const parseYearMonth = (value) => {
                const raw = value == null ? "" : String(value).trim();
                return /^\d{6}$/.test(raw) ? parseDate(raw) : null;
            };

            const normalizedData = data
                .map((d) => ({ ...d, __monthDate: parseYearMonth(d.BEGIN_YEARMONTH) }))
                .filter((d) => d.__monthDate instanceof Date && !Number.isNaN(d.__monthDate.getTime()));

            if (normalizedData.length === 0) {
                tooltip.remove();
                return;
            }

            const groupedData = d3.rollups(
                normalizedData,
                (v) => v.length,
                (d) => d.__monthDate,
                (d) => d.TOR_F_SCALE || "EFU"
            ).map(([date, strengths]) => [date, new Map(strengths || [])]);

            const months = Array.from(new Set(normalizedData.map((d) => d.__monthDate))).sort(d3.ascending);

            const x = d3.scaleTime()
                .domain(d3.extent(months))
                .range([0, width]);

            const yMax = d3.max(groupedData, ([, strengths]) => d3.sum(Array.from(strengths.values()))) || 0;

            const y = d3.scaleLinear()
                .domain([0, yMax]).nice()
                .range([height, 0]);

            const color = d3.scaleOrdinal()
                .domain(EF_SCALE_COLORS.map((d) => d.scale))
                .range(EF_SCALE_COLORS.map((d) => d.color));

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

            const stack = d3.stack()
                .keys(EF_SCALE_COLORS.map((d) => d.scale))
                .value(([, strengths], key) => strengths.get(key) || 0);

            const series = stack(groupedData);

            const monthStep = months.length > 1 ? Math.abs(x(months[1]) - x(months[0])) : width;
            const barWidth = Math.max(10, monthStep - 8);

            svg.append("g")
                .selectAll("g")
                .data(series)
                .join("g")
                .attr("fill", (d) => color(d.key))
                .selectAll("rect")
                .data((d) => d.map((v) => ({ ...v, key: d.key })))
                .join("rect")
                .attr("x", (d) => x(d.data[0]) + (monthStep - barWidth) / 2)
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

            const legend = svg.append("g")
                .attr("transform", `translate(${width - 90}, 0)`);

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

            return () => tooltip.remove();
        };

        let cleanup = renderChart();
        const handleResize = () => {
            cleanup?.();
            cleanup = renderChart();
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            cleanup?.();
        };
    }, [data]);

    return (
        <div className="tornado-map-container" ref={wrapperRef}>
            <h2 className="chart-title">Stacked Bars - Tornadic Events by Month - Interactive</h2>
            <p className="chart-description">
                This chart shows the number of tornadoes by month, stacke by EF scale. Hover over the bars to see details.
            </p>
            <div className="timeline-chart-wrapper">
                <svg ref={chartRef}></svg>
            </div>
        </div>
    );
};

export default TimelineChart;
