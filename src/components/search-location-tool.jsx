import React, { useEffect, useState } from "react";
import SearchInput from "./search-input";
import LocationList from "./location-list";
import plus from "/plus.png";
import minus from "/minus.png";

/**
 * Collapsible container for the manual search workflow.
 * When expanded it reveals the input form and the resulting location list.
 */
export const SearchLocationTool = ({
  setDisplayDate,
  coordinates,
  setCoordinates,
  weather,
  setWeather,
  searchOptions,
  setSearchOptions,
  currentLocation,
  setCurrentLocation,
  locations,
  setLocations,
  setSelectedLocation,
}) => {
  const [searchToolOpen, setSearchToolOpen] = useState(false);
  const [isDataLoading, setIsDataLoading] = useState(false);

  useEffect(() => {
    // Encourage users without coordinates to start with manual search.
    if (coordinates === undefined) {
      setSearchToolOpen(true);
    } else {
      setSearchToolOpen(false);
    }
  }, [coordinates]);

  const toggleSearchTool = () => {
    setSearchToolOpen((prevMode) => !prevMode);
  };

  return (
    <div className="search-location-tool-outer-container">
      <button className="search-location-tool-container" onClick={toggleSearchTool}>
        <img
          className="search-location-tool-img"
          src={searchToolOpen ? minus : plus}
          alt="plus sign"
        />
      </button>

      {searchToolOpen ? (
        <div>
          <div className="user-controls">
            <SearchInput
              coordinates={coordinates}
              setCoordinates={setCoordinates}
              weather={weather}
              setWeather={setWeather}
              searchOptions={searchOptions}
              setSearchOptions={setSearchOptions}
              setIsDataLoading={setIsDataLoading}
              locations={locations}
              setLocations={setLocations}
              setSelectedLocation={setSelectedLocation}
              setSearchToolOpen={setSearchToolOpen}
            />
            <LocationList
              setDisplayDate={setDisplayDate}
              setWeather={setWeather}
              searchOptions={searchOptions}
              isDataLoading={isDataLoading}
              currentLocation={currentLocation}
              setCurrentLocation={setCurrentLocation}
              locations={locations}
              setLocations={setLocations}
              setSelectedLocation={setSelectedLocation}
              setSearchToolOpen={setSearchToolOpen}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default SearchLocationTool;