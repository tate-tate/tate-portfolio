import React, { useState, useEffect } from "react";
import TornadoMap from "../components/TornadoMap";
import TornadoStats from "../components/TornadoStats";
import TornadoShape from "../components/TornadoShape";
import Filters from "../components/Filters";
import styles from "../styles/d3Vis.module.css";
import { processTornadoData } from "../utils/d3Helpers";

const D3Vis = () => {
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [selectedState, setSelectedState] = useState("all");

    useEffect(() => {
        d3.csv("/assets/data/2024weatherdata.csv").then((csvData) => {
            const processedData = processTornadoData(csvData);
            setData(processedData);
            setFilteredData(processedData);
        });
    }, []);

    const handleFilterChange = (newFilteredData) => {
        setFilteredData(newFilteredData);
    };

    return (
        <div className={styles.container}>
            <h1>Tornadic Events in 2024</h1>
            <div className={styles.row}>
                <TornadoStats data={filteredData} selectedState={selectedState} />
                <TornadoShape data={filteredData} />
            </div>
            <div className={styles.row}>
                <TornadoMap />
                <Filters data={data} onFilterChange={handleFilterChange} />
            </div>
        </div>
    );
};

export default D3Vis;