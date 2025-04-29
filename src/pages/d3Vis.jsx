import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import styles from "../styles/d3Vis.module.css";
import TornadoStats from "../components/TornadoStats";
import TornadoShape from "../components/TornadoShape";
import TornadoMap from "../components/TornadoMap";
import Filters from "../components/Filters";
import TimelineChart from "../components/TimelineChart";

const D3Vis = () => {
    const [data, setData] = useState([]); // State to hold the tornado data
    const [filteredData, setFilteredData] = useState([]); // State for filtered data
    const [selectedState, setSelectedState] = useState("all"); // State for selected state

    const projection = d3.geoAlbersUsa().scale(1500).translate([600, 400]); // Map projection

    useEffect(() => {
        d3.csv("/assets/data/2024tornadoes.csv").then((csvData) => {
            const processedData = csvData.map((d) => ({
                ...d,
                TOR_F_SCALE: d.TOR_F_SCALE ? d.TOR_F_SCALE.trim() : "EFU", // Trim and handle missing values
                BEGIN_LAT: +d.BEGIN_LAT,
                BEGIN_LON: +d.BEGIN_LON,
                INJURIES_DIRECT: +d.INJURIES_DIRECT || 0,
                INJURIES_INDIRECT: +d.INJURIES_INDIRECT || 0,
                DEATHS_DIRECT: +d.DEATHS_DIRECT || 0,
                DEATHS_INDIRECT: +d.DEATHS_INDIRECT || 0,
                TOTAL_INJURIES: (+d.INJURIES_DIRECT || 0) + (+d.INJURIES_INDIRECT || 0),
                TOTAL_DEATHS: (+d.DEATHS_DIRECT || 0) + (+d.DEATHS_INDIRECT || 0),
            }));
    
            setData(processedData);
            setFilteredData(processedData); // Initially, filtered data is the same as the full data
        });
    }, []);

    const handleFilterChange = (newFilteredData) => {
        setFilteredData(newFilteredData);
    };

    return (
        <div className={styles.container}>
            <div className={styles.row}>
                {filteredData.length > 0 && (
                    <>
                        <div className={styles.stats}>
                            <TornadoStats data={filteredData} selectedState={selectedState} />
                        </div>
                        <div className={styles.shape}>
                            <TornadoShape data={filteredData} projection={projection} />
                        </div>
                    </>
                )}
            </div>
            <div className={styles.mapSection}>
                <TornadoMap data={filteredData} />
            </div>
            <TimelineChart data={filteredData} />
        </div>
    );
};

export default D3Vis;