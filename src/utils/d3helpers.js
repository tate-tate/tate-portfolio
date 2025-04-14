import * as d3 from "d3";

/**
 * Processes CSV data for tornado visualization.
 * @param {Array} csvData - Raw CSV data.
 * @returns {Array} Processed data.
 */
export const processTornadoData = (csvData) => {
    return csvData.map((d) => ({
        ...d,
        TOR_F_SCALE: d.TOR_F_SCALE ? +d.TOR_F_SCALE.replace("EF", "") : null,
        BEGIN_LAT: +d.BEGIN_LAT,
        BEGIN_LON: +d.BEGIN_LON,
        INJURIES_DIRECT: +d.INJURIES_DIRECT || 0,
        INJURIES_INDIRECT: +d.INJURIES_INDIRECT || 0,
        DEATHS_DIRECT: +d.DEATHS_DIRECT || 0,
        DEATHS_INDIRECT: +d.DEATHS_INDIRECT || 0,
        TOTAL_INJURIES: (+d.INJURIES_DIRECT || 0) + (+d.INJURIES_INDIRECT || 0),
        TOTAL_DEATHS: (+d.DEATHS_DIRECT || 0) + (+d.DEATHS_INDIRECT || 0),
    }));
};

/**
 * Creates a D3 color scale for tornado EF scales.
 * @returns {Function} D3 color scale.
 */
export const createColorScale = () => {
    return d3.scaleOrdinal()
        .domain([1, 2, 3, 4, 5])
        .range(["#4FEB00", "#D7EA00", "#EBA600", "#EA4700", "#EB0101"]);
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
        filteredData = filteredData.filter((d) => d.TOR_F_SCALE === +strength);
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
    const averageEFScale = totalTornadoes > 0
        ? (data.reduce((sum, d) => sum + d.TOR_F_SCALE, 0) / totalTornadoes).toFixed(2)
        : "N/A";
    const strongestTornado = totalTornadoes > 0
        ? Math.max(...data.map((d) => d.TOR_F_SCALE))
        : "N/A";

    return {
        totalTornadoes,
        totalInjuries,
        totalDeaths,
        averageEFScale,
        strongestTornado,
    };
};