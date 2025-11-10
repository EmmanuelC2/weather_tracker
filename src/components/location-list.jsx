import React from "react";
import { RotatingLines } from "react-loader-spinner";
import { getWeatherReport } from "../services/weather-service-api";

/**
 * Renders the list of geo-coded results returned from the manual search flow.
 * Selecting an entry hydrates the weather state with the lat/lon pair from the lookup response.
 */
export const LocationList = ({
  setWeather,
  setDisplayDate,
  searchOptions,
  isDataLoading,
  currentLocation,
  setCurrentLocation,
  locations,
  setLocations,
  setSelectedLocation,
  setSearchToolOpen,
}) => {
  const handleChange = (event) => {
    const location = event.target.value.split(",");

    for (const option of searchOptions) {
      const matchesOption =
        option.name.trim() === location[0].trim() &&
        option.state.trim() === location[1].trim() &&
        option.country.trim() === location[2].trim();

      if (!matchesOption) {
        continue;
      }

      getWeatherReport({
        coordinates: {
          lat: option.lat,
          lon: option.lon,
        },
        setDisplayDate,
        setWeather,
        currentLocation,
        setCurrentLocation,
        locations,
        setLocations,
        setSelectedLocation,
        setSearchToolOpen,
        city: option.name.trim(),
      });
      break;
    }
  };

  if (!searchOptions) {
    return <div className="list-outer-container" />;
  }

  return (
    <div className="list-outer-container">
      <div className="location-list-container">
        <label className="list-header">Click a Location to save: </label>

        {isDataLoading ? (
          <ol className="unordered-list">
            <RotatingLines
              strokeColor="black"
              strokeWidth="5"
              animationDuration="0.75"
              width="96"
              visible={true}
            />
          </ol>
        ) : (
          <ol className="unordered-list">
            {searchOptions.map((options, index) => (
              <li className="location-list-items" key={index}>
                <div className="location-list-button-container">
                  <input
                    className="location-list-button"
                    type="button"
                    value={[options.name + ", " + options.state + ", " + options.country]}
                    onClick={handleChange}
                  />
                </div>
              </li>
            ))}
          </ol>
        )}
      </div>
    </div>
  );
};

export default LocationList;