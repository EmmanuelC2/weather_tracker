import React from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";

/**
 * Material UI wrapper around the saved locations array.
 * Once a city is selected we simply update shared state; the follow-up weather
 * refresh will be wired separately.
 */
export const SavedLocations = ({ locations, selectedLocation, setSelectedLocation }) => {
  const handleChange = (event) => {
    setSelectedLocation(event.target.value);
    console.log("Should retrieve required information to change scene.");
  };

  return (
    <div className="locations-drop-down-container">
      {locations[0] !== undefined ? (
        <div className="locations-drop-down-inner-container">
          <InputLabel id="locations-select-label">Current Location: </InputLabel>
          <Select
            labelId="locations-select-label"
            id="locations-select"
            value={selectedLocation}
            label="Current Location: "
            onChange={handleChange}
          >
            {locations.map((options, index) => (
              <MenuItem value={options.city} key={index}>
                {options.city}
              </MenuItem>
            ))}
          </Select>
        </div>
      ) : (
        <div className="locations-drop-down-inner-container">
          <h2>No saved locations!</h2>
        </div>
      )}
    </div>
  );
};

export default SavedLocations;
