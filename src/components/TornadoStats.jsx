import React, { useEffect, useState } from "react";
import { calculateStateStats } from "../utils/d3Helpers";

const TornadoStats = ({ data, selectedState }) => {
    const [stats, setStats] = useState({});

    useEffect(() => {
        const stateStats = calculateStateStats(data);
        setStats(stateStats);
    }, [data]);

    return (
        <div id="tornadoStats" className="stats-box">
            <h2>2024 Tornado Notes</h2>
            <button id="toggleMode" className="btn">Toggle Light/Dark Mode</button>
            <div id="tornadoNotes">
                <h3>Overview</h3>
                <p>State: {selectedState === "all" ? "All States" : selectedState}</p>
                <p>Total Tornadoes: {stats.totalTornadoes}</p>
                <p>Total Injuries: {stats.totalInjuries}</p>
                <p>Total Deaths: {stats.totalDeaths}</p>
                <p>Average EF Scale: {stats.averageEFScale}</p>
                <p>Strongest Tornado: {stats.strongestTornado === "N/A" ? "N/A" : `EF${stats.strongestTornado}`}</p>
            </div>
        </div>
    );
};

export default TornadoStats;