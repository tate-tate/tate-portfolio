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
            <h1>2024 in Tornadoes - a d3.js Visualization</h1>
            <div id="tornadoNotes">
                <br></br>
                <h2>Overview</h2>
                <p>
                    The tornado data (provided by NOAA) for 2024 is visualized using D3.js. The statistics below provide an overview of the
                    tornadoes that occurred in across the US. </p>
                <p><strong>Total Tornadoes:</strong> {stats.totalTornadoes} - The visualization to the right is a modified bar chart that shows the number of tornadoes per strength. EFU indicates that the strength was not determined.</p>
                <p><strong>Total Injuries (Direct & Indirect):</strong> {stats.totalInjuries}</p>
                <p><strong>Total Deaths (Direct & Indirect):</strong> {stats.totalDeaths}</p>
                <p><strong>Total Damage:</strong> ${stats.totalDamage} (Property + Crops)</p>
                <p><strong>Longest Tornado Path:</strong> {stats.longestPath}</p>
                <p><strong>Widest Tornado:</strong> {stats.widestTornado}</p>
                <p><strong>Note:</strong> Damage stats are not entirely accurate - as you will see on many of the map tooltips, reported damage was $0 - while this may be true occaisionally, it typically means that damage was not officially recorded by NOAA.</p>

            </div>
        </div>
    );
};

export default TornadoStats;