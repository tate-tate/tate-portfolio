import React, { useEffect } from "react";
import * as d3 from "d3";
import { processTornadoData } from "../utils/d3Helpers";

const TornadoShape = ({ data }) => {
    useEffect(() => {
        const processedData = processTornadoData(data);

        const tornadoContainer = d3.select("#tornadoShape");

        const width = tornadoContainer.node().offsetWidth;
        const height = tornadoContainer.node().offsetHeight;

        tornadoContainer.selectAll(".tornado-dot")
            .data(processedData)
            .enter()
            .append("div")
            .attr("class", "tornado-dot")
            .style("left", (d, i) => {
                const level = i / processedData.length;
                const maxWidthAtLevel = width * 0.6 * (1 - level);
                return `${(width / 2) - (maxWidthAtLevel / 2) + Math.random() * maxWidthAtLevel}px`;
            })
            .style("top", (d, i) => `${(i / processedData.length) * height}px`)
            .style("opacity", 0.8);
    }, [data]);

    return <div id="tornadoShape" className="chart"></div>;
};

export default TornadoShape;