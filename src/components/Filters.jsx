import React, { useState, useEffect } from "react";
import "../styles/filters.css";

const Filters = ({ data, onFilterChange, onStateChange }) => {
    const [state, setState] = useState("all");
    const [strength, setStrength] = useState("all");
    const [states, setStates] = useState([]);

    useEffect(() => {
        const uniqueStates = Array.from(new Set(data.map((d) => d.STATE))).sort();
        setStates(uniqueStates);
    }, [data]);

    useEffect(() => {
        if (onFilterChange) {
            onFilterChange({ state, strength });
        }
    }, [state, strength, onFilterChange]);

    useEffect(() => {
        if (onStateChange && state !== "all") {
            console.log("State changed to:", state);
            onStateChange(state);
        }
    }, [state, onStateChange]);

    return (
        <div id="filters" className="filters-container">
            <label htmlFor="tornadoStrength" className="filter-label">Tornado Strength:</label>
            <select
                id="tornadoStrength"
                value={strength}
                onChange={(e) => setStrength(e.target.value)}
                className="filter-dropdown"
            >
                <option value="all">All</option>
                <option value="EF0">EF0</option>
                <option value="EF1">EF1</option>
                <option value="EF2">EF2</option>
                <option value="EF3">EF3</option>
                <option value="EF4">EF4</option>
                <option value="EFU">EFU (Unknown)</option>
            </select>
            <br /><br />
            <label htmlFor="stateSelect" className="filter-label">Select a State:</label>
            <select
                id="stateSelect"
                value={state}
                onChange={(e) => setState(e.target.value)}
                className="filter-dropdown"
            >
                <option value="all">All States</option>
                {states.map((stateName) => (
                    <option key={stateName} value={stateName}>
                        {stateName}
                    </option>
                ))}
            </select>
        </div>
    );
};

export default Filters;