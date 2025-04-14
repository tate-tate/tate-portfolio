import React, { useState } from "react";
import { filterTornadoData } from "../utils/d3Helpers";

const Filters = ({ data, onFilterChange }) => {
    const [state, setState] = useState("all");
    const [strength, setStrength] = useState("all");

    const handleFilterChange = () => {
        const filteredData = filterTornadoData(data, state, strength);
        onFilterChange(filteredData);
    };

    return (
        <div id="filters">
            <label htmlFor="tornadoStrength">Tornado Strength:</label>
            <select
                id="tornadoStrength"
                value={strength}
                onChange={(e) => {
                    setStrength(e.target.value);
                    handleFilterChange();
                }}
            >
                <option value="all">All</option>
                <option value="1">EF1</option>
                <option value="2">EF2</option>
                <option value="3">EF3</option>
                <option value="4">EF4</option>
                <option value="5">EF5</option>
            </select>
            <br /><br />
            <label htmlFor="stateSelect">Select a State:</label>
            <select
                id="stateSelect"
                value={state}
                onChange={(e) => {
                    setState(e.target.value);
                    handleFilterChange();
                }}
            >
                <option value="all">All States</option>
                {/* State options will be dynamically populated */}
            </select>
        </div>
    );
};

export default Filters;