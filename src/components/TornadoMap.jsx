import React, { useEffect, useState, useRef } from "react";
import * as d3 from "d3";
import Filters from "./Filters";

export const EF_SCALE_COLORS = [ //export colors for timeline
    { scale: "EF0", color: "#00FF00" },
    { scale: "EF1", color: "#FFFF00" },
    { scale: "EF2", color: "#FFA500" }, 
    { scale: "EF3", color: "#FF4500" }, 
    { scale: "EF4", color: "#FF0000" }, 
    { scale: "EFU", color: "#808080" }, 
];



const TornadoMap = ({ data }) => {
    const [filteredData, setFilteredData] = useState(data);
    const [selectedState, setSelectedState] = useState("all");

    // refs for SVG, projection, path, and zoom
    const svgRef = useRef(null);
    const mapGroupRef = useRef(null);
    const projectionRef = useRef(null);
    const pathRef = useRef(null);
    const zoomRef = useRef(null);

    useEffect(() => {
        const width = 1200;
        const height = 800;
        d3.select("#map").selectAll("*").remove();

        //SVG element
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

        const zoom = d3.zoom()
            .scaleExtent([1, 8]) // Allow zooming
            .on("zoom", (event) => {
                mapGroup.attr("transform", event.transform);
            });

        svg.call(zoom);
        zoomRef.current = zoom;

        //render map
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
                        setSelectedState(d.properties.name);
                    });
            })
            .catch((error) => {
                console.error("Error loading US states JSON:", error);
            });
    }, []);

    useEffect(() => {
        if (!mapGroupRef.current || !projectionRef.current) return;
    
        const mapGroup = mapGroupRef.current;
        const projection = projectionRef.current;
        mapGroup.selectAll("circle").remove();
    
        const colorScale = {
            EF0: "#00FF00",
            EF1: "#FFFF00",
            EF2: "#FFA500",
            EF3: "#FF4500",
            EF4: "#FF0000",
            EFU: "#808080",
        };
        //event circles on map
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
            .attr("fill", (d) => colorScale[d.TOR_F_SCALE] || "#808080")
            .attr("opacity", 0.6)
            .on("mouseover", (event, d) => {
                // Format date & time
                const yearMonth = d.BEGIN_YEARMONTH.toString();
                const year = yearMonth.slice(0, 4);
                const month = yearMonth.slice(4, 6);
                const day = d.BEGIN_DAY.toString().padStart(2, "0");
                const time = d.BEGIN_TIME.toString().padStart(4, "0");
                const formattedTime = `${time.slice(0, 2)}:${time.slice(2)}`;
                const formattedDate = `${month}/${day}/${year} ${formattedTime}`;
                d3.select("#tooltip")
                    .style("opacity", 1)
                    .html(`
                        <div style="font-size: 14px; font-weight: bold;">Tornado Details</div>
                        <strong>State:</strong> ${d.STATE}<br>
                        <strong>City:</strong> ${d.BEGIN_LOCATION || "Unknown"}<br>
                        <strong>EF Scale:</strong> ${d.TOR_F_SCALE}<br>
                        <strong>Date:</strong> ${formattedDate}<br>
                        <strong>Latitude:</strong> ${d.BEGIN_LAT}<br>
                        <strong>Longitude:</strong> ${d.BEGIN_LON}<br>
                        <strong>Injuries:</strong> ${d.INJURIES_DIRECT}<br>
                        <strong>Deaths:</strong> ${d.DEATHS_DIRECT}<br>
                        <strong>Property Damage:</strong> $${d.DAMAGE_PROPERTY_CONV || 0}<br>
                    `);
            })
            .on("mousemove", (event) => {
                const tooltip = d3.select("#tooltip");
                const mapContainer = document.getElementById("map");
                const mapRect = mapContainer.getBoundingClientRect(); // Get the map's position on the screen

                const scale = mapContainer.offsetWidth / mapRect.width; // Account for page zoom or scaling

                // Adjust tooltip position relative to the map container and scaling
                tooltip
                    .style("left", `${(event.clientX - mapRect.left) * scale + 10}px`)
                    .style("top", `${(event.clientY - mapRect.top) * scale + 10}px`); 
            })
            .on("mouseout", () => {
                d3.select("#tooltip")
                    .style("opacity", 0);
            });
    }, [filteredData]);

    useEffect(() => {
        if (!pathRef.current || !mapGroupRef.current || !svgRef.current || !zoomRef.current) return;

        const mapGroup = mapGroupRef.current;
        const svg = svgRef.current;
        const zoom = zoomRef.current;

        if (selectedState === "all") {
            // Reset the zoom to show the entire map
            svg.transition().duration(750).call(
                zoom.transform,
                d3.zoomIdentity
            );
            mapGroup.transition().duration(750).attr("transform", "translate(0, 0) scale(1)");
            return;
        }

        d3.json("/assets/data/us-states.json")
            .then((us) => {
                const stateFeature = us.features.find(
                    (feature) =>
                        feature.properties?.NAME?.toLowerCase() === selectedState.toLowerCase()
                );

                if (!stateFeature) {
                    console.warn(`No matching state found for: ${selectedState}`);
                    return;
                }

                const path = pathRef.current;

                const [[x0, y0], [x1, y1]] = path.bounds(stateFeature);

                // Calculate the scale and translation
                const scale = Math.min(8, 0.9 / Math.max((x1 - x0) / 1200, (y1 - y0) / 800));
                const translate = [
                    1200 / 2 - scale * (x0 + x1) / 2,
                    800 / 2 - scale * (y0 + y1) / 2,
                ];

                svg.transition().duration(750).call(
                    zoom.transform,
                    d3.zoomIdentity
                        .translate(translate[0], translate[1])
                        .scale(scale)
                );
            })
            .catch((error) => {
                console.error("Error loading US states JSON:", error);
            });
    }, [selectedState]);

    const handleFilterChange = ({ state, strength }) => {
        //filter
        const filtered = data.filter((d) => {
            const matchesState = state === "all" || d.STATE === state;
            const matchesStrength = strength === "all" || d.TOR_F_SCALE === strength;
            return matchesState && matchesStrength;
        });

        // prevent duplicate filters
        setFilteredData((prevFilteredData) => {
            if (JSON.stringify(prevFilteredData) !== JSON.stringify(filtered)) {
                return filtered;
            }
            return prevFilteredData;
        });
    };

    return ( //component return, renders map
        <div className="tornado-map-container">
            <h2 style={{ textAlign: "center", marginBottom: "20px" }}>Tornado Map - Interactive</h2>
            <p style={{ textAlign: "center", marginBottom: "20px" }}>
                This map is interactive. If you select an EF scale, the map will show only tornadoes with that strength. If you select a state, the map will only show tornadoes in that state, and will zoom in to show the state closer. If you hover over a dot, it will show you a tooltip with specific information about that tornado.
            </p>
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
                    color: "#000",
                    padding: "5px",
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    pointerEvents: "none",
                    fontSize: "12px",
                    fontWeight: "bold",
                }}
            ></div>
            {/* Add the legend */}
            <div id="legend" style={{ marginTop: "10px", display: "flex", gap: "10px" }}>
                {EF_SCALE_COLORS.map((item) => (
                    <div key={item.scale} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                        <div
                            style={{
                                width: "20px",
                                height: "20px",
                                backgroundColor: item.color,
                                border: "1px solid #ccc",
                            }}
                        ></div>
                        <span style={{ fontSize: "12px", fontWeight: "bold" }}>{item.scale}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TornadoMap;