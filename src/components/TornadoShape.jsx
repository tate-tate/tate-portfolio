import React, { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

const TornadoShape = ({ data }) => {
    const svgRef = useRef(null);
    const [isDarkMode, setIsDarkMode] = useState(() => {
        // Default to dark mode if the "dark-mode" class is present on the body
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

        // Group tornadoes by EF scale
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

        // Ensure all EF scales (EF0 to EF5) are included, even if they have 0 occurrences
        const allScales = ["EF0", "EF1", "EF2", "EF3", "EF4", "EF5", "EFU"];
        const tornadoCountsWithDefaults = allScales.map((scale) => ({
            scale,
            count: tornadoCounts.find((d) => d.scale === scale)?.count || 0,
        }));

        // Create scales
        const maxCount = d3.max(tornadoCountsWithDefaults, (d) => d.count);
        const taperScale = d3
            .scaleLinear()
            .domain([0, tornadoCountsWithDefaults.length - 1]) // From top (EF0) to bottom (EFU)
            .range([width * 0.8, width * 0.2]); // Bars taper from 80% to 20% of the width

        const yScale = d3
            .scaleBand()
            .domain(tornadoCountsWithDefaults.map((d) => d.scale))
            .range([0, height])
            .padding(0.2); // Add spacing between bars

        // Define colors based on the mode
        const barColor = darkMode ? "#d3d3d3" : "#4a4a4a"; // Light gray in dark mode, dark gray in light mode
        const textColor = darkMode ? "#f8f9fa" : "#212529"; // White text in dark mode, black text in light mode

        // Append bars with animation
        svg.selectAll("rect")
            .data(tornadoCountsWithDefaults)
            .enter()
            .append("rect")
            .attr("x", width / 2) // Start at the center
            .attr("y", (d) => yScale(d.scale))
            .attr("width", 0) // Start with zero width
            .attr("height", yScale.bandwidth())
            .attr("fill", barColor)
            .attr("opacity", 0) // Start fully transparent
            .transition() // Add transition for animation
            .duration(1000) // Animation duration (1 second)
            .delay((d, i) => i * 200) // Stagger the animation for each bar
            .attr("x", (d, i) => width / 2 - taperScale(i) / 2) // Animate to centered position
            .attr("width", (d, i) => taperScale(i)) // Animate to full width
            .attr("opacity", 0.8); // Fade in

        // Append labels for EF scales with animation
        svg.selectAll("text")
            .data(tornadoCountsWithDefaults)
            .enter()
            .append("text")
            .attr("x", width / 2)
            .attr("y", (d) => yScale(d.scale) + yScale.bandwidth() / 2)
            .attr("dy", "0.35em") // Center text vertically
            .attr("text-anchor", "middle")
            .attr("fill", textColor)
            .attr("opacity", 0) // Start fully transparent
            .text((d) => `${d.scale}: ${d.count}`)
            .transition() // Add transition for animation
            .duration(1000) // Animation duration (1 second)
            .delay((d, i) => i * 200) // Stagger the animation for each label
            .attr("opacity", 1); // Fade in
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