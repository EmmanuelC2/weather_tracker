import React, { useEffect, useState } from "react";
import AutoSearch from "./auto-search";
import { callCoordsAPI } from "../services/geo-coords-api";
import plus from "/plus.png";
import minus from "/minus.png";

/**
 * Collapsible control that bootstraps the automatic weather workflow.
 * When opened it renders <AutoSearch />, which displays the detected forecast
 * and allows the user to save the current location.
 */
export const AutoLocationTool = ({
  weather,
  setWeather,
  coordinates,
  setCoordinates,
  locations,
  setLocations,
  currentLocation,
  setCurrentLocation,
  selectedLocation,
  setSelectedLocation,
  displayDate,
  setDisplayDate,
}) => {
  const [autoToolOpen, setAutoToolOpen] = useState(false);

  useEffect(() => {
    if (coordinates === undefined) {
      // Fetch coordinates on first mount so subsequent effects can react to them.
      callCoordsAPI(setCoordinates);
    }

    if (coordinates !== undefined && locations[0] === undefined) {
      // Automatically surface the tool for first-time visitors so they see a forecast quickly.
      setAutoToolOpen(true);
    }
  }, [coordinates, locations]);

  const toggleAutoTool = () => {
    setAutoToolOpen((prevMode) => !prevMode);
  };

  return (
    <div className="auto-location-tool-outer-container">
      <button className="auto-location-tool-container" onClick={toggleAutoTool}>
        <img
          className="auto-location-tool-img"
          src={autoToolOpen ? minus : plus}
          alt="plus sign"
        />
      </button>

      {autoToolOpen ? (
        <div>
          <AutoSearch
            setAutoToolOpen={setAutoToolOpen}
            displayDate={displayDate}
            setDisplayDate={setDisplayDate}
            weather={weather}
            setWeather={setWeather}
            coordinates={coordinates}
            setCoordinates={setCoordinates}
            locations={locations}
            setLocations={setLocations}
            currentLocation={currentLocation}
            setCurrentLocation={setCurrentLocation}
            setSelectedLocation={setSelectedLocation}
          />
        </div>
      ) : null}
    </div>
  );
};

export default AutoLocationTool;
