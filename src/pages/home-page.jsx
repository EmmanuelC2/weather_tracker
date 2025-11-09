import React, { useEffect, useState } from "react";
import PageLayout from "../components/page-layout";
import GeneralBanner from "../components/general-banner";
import useLocalStorage from "use-local-storage";
import AutoLocationTool from "../components/auto-location-tool";
import SearchLocationTool from "../components/search-location-tool";

const api = {
    key: import.meta.env.WEATHER_KEY,
    base: import.meta.env.BASE_URL,
}

export const HomePage = () => {
    const [weather, setWeather] = useState("If you want to find the weather information for a city or town go ahead and search for it by clicking on the second plus sign!")
    const [displayDate, setDisplayDate] = useState("");
    const [coordinates, setCoordinates] = useState();
    const [searchOptions, setSearchOptions] = useState([]);
    const [locations, setLocations] = useLocalStorage("locations",[]);
    const [selectedLocation, setSelectedLocation] = useState(locations[0] !== undefined ? locations[0].city : "");
    const [currentLocation, setCurrentLocation] = useState(locations[0] !== undefined ? locations[0].city : "");

    return (
        <PageLayout>
            <GeneralBanner locations={locations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

            <AutoLocationTool weather={weather} setWeather={setWeather} displayDate={displayDate} setDisplayDate={setDisplayDate} coordinates={coordinates} setCoordinates={setCoordinates} locations={locations} setLocations={setLocations} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

            <SearchLocationTool setDisplayDate={setDisplayDate} coordinates={coordinates} setCoordinates={setCoordinates} weather={weather} setWeather={setWeather} searchOptions={searchOptions} setSearchOptions={setSearchOptions} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} locations={locations} setLocations={setLocations} setSelectedLocation={setSelectedLocation} />
        </PageLayout>
    )
}

export default HomePage;