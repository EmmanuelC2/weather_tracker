import React from "react";

/**
 * Adds the currently previewed location to local storage so it can be surfaced
 * within the banner dropdown. The button is intentionally dumb; it simply guards
 * against duplicates and enforces the five-location limit defined by the UX.
 */
export const AddCityButton = ({
  setAutoToolOpen,
  currentLocation,
  locations,
  setLocations,
  weather,
  setSelectedLocation,
}) => {
  const addCity = (location, weatherData) => {
    if (currentLocation === "") {
      return;
    }

    const payload = {
      city: location,
      lat: weatherData.lat,
      lon: weatherData.lon,
      timezone: weatherData.timezone,
      timezone_offset: weatherData.timezone_offset,
      current_time: weatherData.current_time,
      sunrise: weatherData.sunrise,
      sunset: weatherData.sunset,
      temp: weatherData.temp,
      clouds: weatherData.clouds,
      visibility: weatherData.visibility,
      wind_speed: weatherData.wind_speed,
      weather_main: weatherData.weather_main,
      weather_desc: weatherData.weather_desc,
    };

    if (locations[0] === undefined) {
      // First location simply initializes the local storage array.
      setLocations((existingLocations) => [...existingLocations, payload]);
    } else {
      const duplicateExists = locations.some((saved) => saved.city === payload.city);

      if (duplicateExists) {
        // Guard against duplicates to keep the dropdown concise.
        console.log("Location is already saved!");
        return;
      }

      if (locations.length < 5) {
        // Respect the current UX limit of five saved cities.
        setLocations((existingLocations) => [...existingLocations, payload]);
      } else {
        console.log("Too many locations saved! Please remove a location to add more.");
        return;
      }
    }

    // Reflect the newly added city in the header dropdown and collapse the panel.
    setSelectedLocation(payload.city);
    setAutoToolOpen(false);
  };

  return (
    <div className="add-city-button-container">
      <button onClick={() => addCity(currentLocation, weather)}>Add</button>
    </div>
  );
};

export default AddCityButton;