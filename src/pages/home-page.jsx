import React, { useState } from "react";
import useLocalStorage from "use-local-storage";
import GeneralBanner from "../components/general-banner";
import AutoLocationTool from "../components/auto-location-tool";
import PageLayout from "../components/page-layout";
import SearchLocationTool from "../components/search-location-tool";

/**
 * Coordinates the top-level state shared between the automatic and manual
 * weather search flows. Children receive setters so they can drive the
 * asynchronous workflows while this component retains the single source of truth.
 */
export const HomePage = () => {
  const [weather, setWeather] = useState(
    "If you want to find the weather information for a city or town go ahead and search for it by clicking on the second plus sign!"
  );
  // Timestamp for the active weather report, displayed beneath the forecast.
  const [displayDate, setDisplayDate] = useState("");
  // Browser coordinates used to seed the automatic lookup flow.
  const [coordinates, setCoordinates] = useState();
  // Candidate matches returned when the user submits a manual search.
  const [searchOptions, setSearchOptions] = useState([]);
  // Persisted list of saved locations shared with the banner dropdown.
  const [locations, setLocations] = useLocalStorage("locations", []);
  // Track which saved location is selected from the dropdown banner.
  const [selectedLocation, setSelectedLocation] = useState(
    locations[0] !== undefined ? locations[0].city : ""
  );
  // Human-readable name shown in the active forecast card.
  const [currentLocation, setCurrentLocation] = useState(
    locations[0] !== undefined ? locations[0].city : ""
  );

  return (
    <PageLayout>
      <GeneralBanner
        locations={locations}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <AutoLocationTool
        weather={weather}
        setWeather={setWeather}
        displayDate={displayDate}
        setDisplayDate={setDisplayDate}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        locations={locations}
        setLocations={setLocations}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        selectedLocation={selectedLocation}
        setSelectedLocation={setSelectedLocation}
      />

      <SearchLocationTool
        setDisplayDate={setDisplayDate}
        coordinates={coordinates}
        setCoordinates={setCoordinates}
        weather={weather}
        setWeather={setWeather}
        searchOptions={searchOptions}
        setSearchOptions={setSearchOptions}
        currentLocation={currentLocation}
        setCurrentLocation={setCurrentLocation}
        locations={locations}
        setLocations={setLocations}
        setSelectedLocation={setSelectedLocation}
      />
    </PageLayout>
  );
};

export default HomePage;