import React, { useEffect } from "react";
import TextField from "@mui/material/TextField";
import { AddCityButton } from "./buttons/add-city-button";
import { getWeatherReport } from "../services/weather-service-api";

/**
 * Displays the automatically detected weather report and lets first-time users
 * name and save the location. When only the welcome string is available it kicks
 * off an API request once coordinates are ready.
 */
export const AutoSearch = ({
  setAutoToolOpen,
  displayDate,
  setDisplayDate,
  weather,
  setWeather,
  coordinates,
  setCoordinates,
  locations,
  setLocations,
  currentLocation,
  setCurrentLocation,
  setSelectedLocation,
}) => {
  useEffect(() => {
    if (coordinates !== undefined && typeof weather === "string") {
      getWeatherReport({
        displayDate,
        setDisplayDate,
        coordinates,
        setWeather,
        setCoordinates,
        locations,
        setLocations,
        currentLocation,
        setCurrentLocation,
        setSelectedLocation,
        setAutoToolOpen,
      });
    }
  }, [
    coordinates,
    currentLocation,
    displayDate,
    locations,
    setAutoToolOpen,
    setCoordinates,
    setCurrentLocation,
    setDisplayDate,
    setLocations,
    setSelectedLocation,
    setWeather,
    weather,
  ]);

  const handleInput = (event) => {
    // Keep the forecast header in sync with the editable location name.
    setCurrentLocation(event.target.value);
  };

  const shouldShowLocationInput = locations[0] === undefined;
  const isWelcomeMessage = typeof weather === "string";

  return (
    <div className="weather-feature-container">
      {isWelcomeMessage ? (
        <div>
          {/* Initial copy before a forecast has been retrieved. */}
          <h2>Welcome,</h2>
          <p>{weather}</p>
        </div>
      ) : (
        <div>
          {shouldShowLocationInput ? (
            <div className="input-city-outer-container">
              <div className="input-city-label">
                <span>Enter Current City Location: </span>
              </div>

              <div className="input-city-container">
                <TextField label="City" value={currentLocation} onChange={handleInput} />

                <AddCityButton
                  setAutoToolOpen={setAutoToolOpen}
                  currentLocation={currentLocation}
                  locations={locations}
                  setLocations={setLocations}
                  weather={weather}
                  setSelectedLocation={setSelectedLocation}
                />
              </div>
            </div>
          ) : (
            <div>
              {/* Once a location is saved we display its name instead of the input field. */}
              <h2>{currentLocation}</h2>
            </div>
          )}
          <p>{displayDate}</p>
          <p>{weather.temp}ºF</p>
          <p>{weather.weather_main}</p>
          <p>{weather.weather_desc}</p>
        </div>
      )}
    </div>
  );
};

export default AutoSearch;