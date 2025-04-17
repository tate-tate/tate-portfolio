import React, { useEffect, useState } from "react";
import { calculateStateStats } from "../utils/d3Helpers";

const TornadoStats = ({ data, selectedState = "all" }) => {
    const [stats, setStats] = useState({
        totalTornadoes: 0,
        totalInjuries: 0,
        totalDeaths: 0,
        totalDamage: 0,
        longestPath: "N/A",
        widestTornado: "N/A",
        averageEFScale: "N/A",
        strongestTornado: "N/A",
    });

    useEffect(() => {
        try {
            if (!data || data.length === 0) {
                console.warn("No data provided to TornadoStats.");
                setStats({
                    totalTornadoes: 0,
                    totalInjuries: 0,
                    totalDeaths: 0,
                    totalDamage: 0,
                    longestPath: "N/A",
                    widestTornado: "N/A",
                    averageEFScale: "N/A",
                    strongestTornado: "N/A",
                });
                return;
            }

            // Calculate stats
            const totalTornadoes = data.length;
            const totalInjuries = data.reduce(
                (sum, d) => sum + (d.INJURIES_DIRECT || 0) + (d.INJURIES_INDIRECT || 0),
                0
            );
            const totalDeaths = data.reduce(
                (sum, d) => sum + (d.DEATHS_DIRECT || 0) + (d.DEATHS_INDIRECT || 0),
                0
            );
            const totalDamage = data.reduce(
                (sum, d) => sum + (parseFloat(d.DAMAGE_PROPERTY) || 0) + (parseFloat(d.DAMAGE_CROPS) || 0),
                0
            );
            const longestPath = Math.max(...data.map((d) => parseFloat(d.TOR_LENGTH) || 0)).toFixed(2);
            const widestTornado = Math.max(...data.map((d) => parseFloat(d.TOR_WIDTH) || 0)).toFixed(2);

            const efScales = data
                .filter((d) => d.TOR_F_SCALE && d.TOR_F_SCALE.startsWith("EF"))
                .map((d) => parseInt(d.TOR_F_SCALE.replace("EF", ""), 10));
            const averageEFScale =
                efScales.length > 0
                    ? (efScales.reduce((sum, scale) => sum + scale, 0) / efScales.length).toFixed(1)
                    : "N/A";
            const strongestTornado = efScales.length > 0 ? Math.max(...efScales) : "N/A";

            setStats({
                totalTornadoes,
                totalInjuries,
                totalDeaths,
                totalDamage: totalDamage.toFixed(2),
                longestPath: `${longestPath} miles`,
                widestTornado: `${widestTornado} yards`,
                averageEFScale,
                strongestTornado,
            });
        } catch (error) {
            console.error("Error calculating state stats:", error);
            setStats({
                totalTornadoes: 0,
                totalInjuries: 0,
                totalDeaths: 0,
                totalDamage: 0,
                longestPath: "N/A",
                widestTornado: "N/A",
                averageEFScale: "N/A",
                strongestTornado: "N/A",
            });
        }
    }, [data]);

    return (
        <div id="tornadoStats" className="stats-box">
            <h2>2024 Tornado Notes</h2>
            <div id="tornadoNotes">
                <h3>Overview</h3>
                <p>State: {selectedState === "all" ? "All States" : selectedState}</p>
                <p>Total Tornadoes: {stats.totalTornadoes}</p>
                <p>Total Injuries: {stats.totalInjuries}</p>
                <p>Total Deaths: {stats.totalDeaths}</p>
                <p>Total Damage: ${stats.totalDamage} (Property + Crops)</p>
                <p>Longest Tornado Path: {stats.longestPath}</p>
                <p>Widest Tornado: {stats.widestTornado}</p>
                <p>Average EF Scale: {stats.averageEFScale}</p>
                <p>Strongest Tornado: {stats.strongestTornado === "N/A" ? "N/A" : `EF${stats.strongestTornado}`}</p>
            </div>
        </div>
    );
};

export default TornadoStats;