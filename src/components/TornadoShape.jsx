import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TornadoShape = ({ data }) => {
    const svgRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        return document.body.classList.contains("dark-mode");
    });

    const renderVisualization = (darkMode) => {
        if (!data || data.length === 0) {
            console.warn("No data provided to TornadoShape.");
            return;
        }

        const svg = d3.select(svgRef.current);
        const width = 500;
        const height = 700;

        // Clear existing elements
        svg.selectAll("*").remove();

        const groupedData = d3.rollup(
            data,
            (v) => v.length,
            (d) => d.TOR_F_SCALE && d.TOR_F_SCALE.startsWith("EF") ? d.TOR_F_SCALE : "EFU"
        );

        // Convert grouped data to an array and sort by EF scale
        const tornadoCounts = Array.from(groupedData, ([scale, count]) => ({
            scale,
            count,
        })).sort((a, b) => {
            const scaleA = scaleToNumber(a.scale);
            const scaleB = scaleToNumber(b.scale);
            return scaleA - scaleB;
        });

        //define an include scales
        const allScales = ["EF0", "EF1", "EF2", "EF3", "EF4", "EF5", "EFU"];
        const tornadoCountsWithDefaults = allScales.map((scale) => ({
            scale,
            count: tornadoCounts.find((d) => d.scale === scale)?.count || 0,
        }));

        // Create scales for vis
        const maxCount = d3.max(tornadoCountsWithDefaults, (d) => d.count);
        const taperScale = d3
            .scaleLinear()
            .domain([0, tornadoCountsWithDefaults.length - 1])
            .range([width * 0.8, width * 0.2]);

        const yScale = d3
            .scaleBand()
            .domain(tornadoCountsWithDefaults.map((d) => d.scale))
            .range([0, height])
            .padding(0.2);

        // Define colors based on the mode
        const barColor = darkMode ? "#d3d3d3" : "#4a4a4a";
        const textColor = darkMode ? "#f8f9fa" : "#212529";

        // Append bars with animation
        svg.selectAll("rect")
            .data(tornadoCountsWithDefaults)
            .enter()
            .append("rect")
            .attr("x", width / 2)
            .attr("y", (d) => yScale(d.scale))
            .attr("width", 0)
            .attr("height", yScale.bandwidth())
            .attr("fill", barColor)
            .attr("opacity", 0)
            .transition()
            .duration(1000) 
            .delay((d, i) => i * 200) 
            .attr("x", (d, i) => width / 2 - taperScale(i) / 2) 
            .attr("width", (d, i) => taperScale(i))
            .attr("opacity", 0.8); 

        // Append labels for EF scales with animation
        svg.selectAll("text")
            .data(tornadoCountsWithDefaults)
            .enter()
            .append("text")
            .attr("x", width / 2)
            .attr("y", (d) => yScale(d.scale) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em")
            .attr("text-anchor", "middle")
            .attr("fill", textColor)
            .attr("opacity", 0) 
            .text((d) => `${d.scale}: ${d.count}`)
            .transition()
            .duration(1000) 
            .delay((d, i) => i * 200)
            .attr("opacity", 1);
    };

    useEffect(() => {
        renderVisualization(isDarkMode);
    }, [data]);

    useEffect(() => {
        const observer = new MutationObserver(() => {
            const darkMode = document.body.classList.contains("dark-mode");
            setIsDarkMode(darkMode);
            renderVisualization(darkMode);
        });

        observer.observe(document.body, { attributes: true, attributeFilter: ["class"] });

        return () => observer.disconnect();
    }, []);

    //  function to convert EF scale to a number for sorting
    const scaleToNumber = (scale) => {
        if (scale === "EFU") return 6; // EFU (unknown)
        return +scale.replace("EF", "");
    };

    return (
        <svg
            ref={svgRef}
            width="500"
            height="700"
            style={{ backgroundColor: "transparent" }}
        ></svg>
    );
};

export default TornadoShape;