import * as d3 from "d3";

/**
 * Processes CSV data for tornado visualization.
 * @param {Array} csvData - Raw CSV data.
 * @returns {Array} Processed data.
 */
export const processTornadoData = (csvData) => {
    return csvData.map((d) => ({
        ...d,
        TOR_F_SCALE: d.TOR_F_SCALE && d.TOR_F_SCALE.startsWith("EF") ? d.TOR_F_SCALE : "EFU",
        BEGIN_LAT: +d.BEGIN_LAT || null,
        BEGIN_LON: +d.BEGIN_LON || null,
        INJURIES_DIRECT: +d.INJURIES_DIRECT || 0,
        INJURIES_INDIRECT: +d.INJURIES_INDIRECT || 0,
        DEATHS_DIRECT: +d.DEATHS_DIRECT || 0,
        DEATHS_INDIRECT: +d.DEATHS_INDIRECT || 0,
        TOTAL_INJURIES: (+d.INJURIES_DIRECT || 0) + (+d.INJURIES_INDIRECT || 0),
        TOTAL_DEATHS: (+d.DEATHS_DIRECT || 0) + (+d.DEATHS_INDIRECT || 0),
        DAMAGE_PROPERTY: parseFloat(d.DAMAGE_PROPERTY) || 0,
        DAMAGE_CROPS: parseFloat(d.DAMAGE_CROPS) || 0,
        TOR_LENGTH: parseFloat(d.TOR_LENGTH) || 0,
        TOR_WIDTH: parseFloat(d.TOR_WIDTH) || 0,
    }));
};

/**
 * Creates a D3 color scale for tornado EF scales.
 * @returns {Function} D3 color scale.
 */
export const createColorScale = () => {
    return d3.scaleOrdinal()
        .domain(["EF0", "EF1", "EF2", "EF3", "EF4", "EFU"])
        .range(["#00FF00", "#FFFF00", "#FFA500", "#FF4500", "#FF0000", "#808080"]); // Traffic light + grey for EFU
};

/**
 * Initializes a D3 map projection.
 * @param {number} width - Width of the map.
 * @param {number} height - Height of the map.
 * @returns {Object} D3 projection and path generator.
 */
export const initializeMapProjection = (width, height) => {
    const projection = d3.geoAlbersUsa().scale(1500).translate([width / 2, height / 2]);
    const path = d3.geoPath().projection(projection);
    return { projection, path };
};

/**
 * Filters tornado data based on state and EF scale.
 * @param {Array} data - Tornado data.
 * @param {string} state - Selected state.
 * @param {string} strength - Selected EF scale.
 * @returns {Array} Filtered data.
 */
export const filterTornadoData = (data, state, strength) => {
    let filteredData = data;

    if (state !== "all") {
        filteredData = filteredData.filter((d) => d.STATE.toLowerCase() === state.toLowerCase());
    }

    if (strength !== "all") {
        filteredData = filteredData.filter((d) => d.TOR_F_SCALE === strength);
    }

    return filteredData;
};

/**
 * Updates state-specific statistics.
 * @param {Array} data - Tornado data.
 * @returns {Object} State statistics.
 */
export const calculateStateStats = (data) => {
    const totalTornadoes = data.length;
    const totalInjuries = data.reduce((sum, d) => sum + d.TOTAL_INJURIES, 0);
    const totalDeaths = data.reduce((sum, d) => sum + d.TOTAL_DEATHS, 0);
    const totalDamage = data.reduce((sum, d) => sum + d.DAMAGE_PROPERTY + d.DAMAGE_CROPS, 0).toFixed(2);
    const longestPath = Math.max(...data.map((d) => d.TOR_LENGTH || 0)).toFixed(2);
    const widestTornado = Math.max(...data.map((d) => d.TOR_WIDTH || 0)).toFixed(2);

    const efScales = data
        .filter((d) => d.TOR_F_SCALE && d.TOR_F_SCALE.startsWith("EF"))
        .map((d) => parseInt(d.TOR_F_SCALE.replace("EF", ""), 10));
    const averageEFScale =
        efScales.length > 0
            ? (efScales.reduce((sum, scale) => sum + scale, 0) / efScales.length).toFixed(1)
            : "N/A";
    const strongestTornado = efScales.length > 0 ? Math.max(...efScales) : "N/A";

    return {
        totalTornadoes,
        totalInjuries,
        totalDeaths,
        totalDamage,
        longestPath: `${longestPath} miles`,
        widestTornado: `${widestTornado} yards`,
        averageEFScale,
        strongestTornado: strongestTornado === "N/A" ? "N/A" : `EF${strongestTornado}`,
    };
};