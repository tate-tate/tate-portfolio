import React, { useEffect } from "react";
import * as d3 from "d3";
import { initializeMapProjection } from "../utils/d3Helpers";

const TornadoMap = () => {
    useEffect(() => {
        const width = 1200;
        const height = 800;

        const { projection, path } = initializeMapProjection(width, height);

        const svg = d3.select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        const mapGroup = svg.append("g");

        const zoom = d3.zoom()
            .scaleExtent([1, 8])
            .on("zoom", (event) => {
                mapGroup.attr("transform", event.transform);
            });

        svg.call(zoom);

        d3.json("/assets/data/us-states.json").then((us) => {
            mapGroup.selectAll("path")
                .data(us.features)
                .enter()
                .append("path")
                .attr("d", path)
                .attr("fill", "#EAEAEA")
                .attr("stroke", "#333");
        });
    }, []);

    return <div id="map" className="chart"></div>;
};

export default TornadoMap;