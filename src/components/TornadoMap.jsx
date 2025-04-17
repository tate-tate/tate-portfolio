import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Filters from "./Filters";

const TornadoMap = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedState, setSelectedState] = useState("all");

    // Refs for SVG, projection, path, and zoom
    const svgRef = useRef(null);
    const mapGroupRef = useRef(null);
    const projectionRef = useRef(null);
    const pathRef = useRef(null);
    const zoomRef = useRef(null); // Store the zoom instance

    useEffect(() => {
        // Set up the map dimensions
        const width = 1200;
        const height = 800;

        // Clear any existing SVG to prevent duplicates
        d3.select("#map").selectAll("*").remove();

        // Create the SVG element
        const svg = d3
            .select("#map")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        svgRef.current = svg;

        const projection = d3.geoAlbersUsa().scale(1500).translate([width / 2, height / 2]);
        projectionRef.current = projection;

        const path = d3.geoPath().projection(projection);
        pathRef.current = path;

        const mapGroup = svg.append("g");
        mapGroupRef.current = mapGroup;

        // Initialize zoom behavior
        const zoom = d3.zoom()
            .scaleExtent([1, 8]) // Allow zooming between 1x and 8x
            .on("zoom", (event) => {
                mapGroup.attr("transform", event.transform); // Apply zoom transformation
            });

        svg.call(zoom); // Attach zoom behavior to the SVG
        zoomRef.current = zoom; // Store the zoom instance for programmatic use

        // Load and render the US states map
        d3.json("/assets/data/us-states.json")
            .then((us) => {
                mapGroup.selectAll("path")
                    .data(us.features)
                    .enter()
                    .append("path")
                    .attr("d", path)
                    .attr("fill", "#EAEAEA")
                    .attr("stroke", "#333")
                    .on("click", (event, d) => {
                        setSelectedState(d.properties.name); // Update the selected state
                    });
            })
            .catch((error) => {
                console.error("Error loading US states JSON:", error);
            });
    }, []); // Run only once on component mount

    useEffect(() => {
        // Render tornado dots whenever filteredData changes
        if (!mapGroupRef.current || !projectionRef.current) return;

        const mapGroup = mapGroupRef.current;
        const projection = projectionRef.current;

        // Clear existing dots
        mapGroup.selectAll("circle").remove();

        // Define the color scale for EF scales
        const colorScale = {
            EF0: "#00FF00", // Green
            EF1: "#FFFF00", // Yellow
            EF2: "#FFA500", // Orange
            EF3: "#FF4500", // Dark Orange
            EF4: "#FF0000", // Red
            EFU: "#808080", // Grey
        };

        // Add tornado dots
        mapGroup.selectAll("circle")
            .data(filteredData)
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
                return coords ? coords[0] : null;
            })
            .attr("cy", (d) => {
                const coords = projection([d.BEGIN_LON, d.BEGIN_LAT]);
                return coords ? coords[1] : null;
            })
            .attr("r", 4)
            .attr("fill", (d) => colorScale[d.TOR_F_SCALE] || "#808080") // Default to grey if EF scale is missing
            .attr("opacity", 0.6)
            .on("mouseover", (event, d) => {
                d3.select("#tooltip")
                    .style("opacity", 1)
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`)
                    .html(`
                        <strong>EF Scale:</strong> ${d.TOR_F_SCALE}<br>
                        <strong>Latitude:</strong> ${d.BEGIN_LAT}<br>
                        <strong>Longitude:</strong> ${d.BEGIN_LON}<br>
                        <strong>Injuries:</strong> ${d.TOTAL_INJURIES}<br>
                        <strong>Deaths:</strong> ${d.TOTAL_DEATHS}
                    `);
            })
            .on("mousemove", (event) => {
                d3.select("#tooltip")
                    .style("left", `${event.pageX + 10}px`)
                    .style("top", `${event.pageY + 10}px`);
            })
            .on("mouseout", () => {
                d3.select("#tooltip")
                    .style("opacity", 0);
            });
    }, [filteredData]); // Re-run when filteredData changes

    useEffect(() => {
        console.log("Selected state:", selectedState); // Debug log
        if (!selectedState || selectedState === "all" || !pathRef.current || !svgRef.current || !zoomRef.current) return;
    
        d3.json("/assets/data/us-states.json")
            .then((us) => {
                console.log("GeoJSON features:", us.features); // Debug log
                const stateFeature = us.features.find(
                    (feature) => feature.properties.name.toLowerCase() === selectedState.toLowerCase()
                );
                console.log("State feature:", stateFeature); // Debug log
                if (stateFeature) {
                    const svg = svgRef.current;
                    const path = pathRef.current;
                    const zoom = zoomRef.current;
    
                    const [[x0, y0], [x1, y1]] = path.bounds(stateFeature);
    
                    // Calculate the scale and translation
                    const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / 1200, (y1 - y0) / 800));
                    const translate = [
                        1200 / 2 - scale * (x0 + x1) / 2,
                        800 / 2 - scale * (y0 + y1) / 2,
                    ];
    
                    console.log("Zoom parameters:", { scale, translate }); // Debug log
    
                    // Apply the transformation programmatically using the zoom instance
                    svg.transition().duration(750).call(
                        zoom.transform,
                        d3.zoomIdentity
                            .translate(translate[0], translate[1])
                            .scale(scale)
                    );
                }
            })
            .catch((error) => {
                console.error("Error loading US states JSON:", error);
            });
    }, [selectedState]);

    const handleFilterChange = ({ state, strength }) => {
        // Filter the data based on the selected state and strength
        const filtered = data.filter((d) => {
            const matchesState = state === "all" || d.STATE === state;
            const matchesStrength = strength === "all" || d.TOR_F_SCALE === strength;
            return matchesState && matchesStrength;
        });

        // Only update filteredData if the filtered result is different
        setFilteredData((prevFilteredData) => {
            if (JSON.stringify(prevFilteredData) !== JSON.stringify(filtered)) {
                return filtered;
            }
            return prevFilteredData;
        });
    };

    return (
        <div>
            <Filters
                data={data}
                onFilterChange={handleFilterChange}
                onStateChange={(state) => setSelectedState(state)}
            />
            <div id="map" className="chart"></div>
            <div
                id="tooltip"
                style={{
                    position: "absolute",
                    opacity: 0,
                    background: "#fff",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    pointerEvents: "none",
                }}
            ></div>
        </div>
    );
};

export default TornadoMap;