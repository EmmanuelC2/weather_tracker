import React, { useState,useEffect } from "react";
import SearchInput from "./search-input";
import LocationList from "./location-list";
import plus from "/plus.png";
import minus from "/minus.png"

export const SearchLocationTool = ({setDisplayDate,coordinates,setCoordinates,weather,setWeather,searchOptions,setSearchOptions,currentLocation,setCurrentLocation,locations, setLocations, setSelectedLocation}) => {

    const [searchToolOpen, setSearchToolOpen] = useState(false);
    const [isDataLoading, setIsDataLoading] = useState(false);

    useEffect(() =>{
        if(coordinates === undefined){
            setSearchToolOpen(true);
        }else{
            setSearchToolOpen(false);
        }
    }, []);

    const handleEvent = () => {
        console.log("open search tool module");
    }

    return (
        <div className="search-location-tool-outer-container">
            <button className="search-location-tool-container" onClick={handleEvent}>
                <img
                    className="search-location-tool-img"
                    src={searchToolOpen ? minus : plus}
                    onClick={() => setSearchToolOpen(prevMode => !prevMode)}
                    alt="plus sign">
                </img>
            </button>

            {searchToolOpen ?
                <div>
                    <div className="user-controls">
                        <SearchInput coordinates={coordinates} setCoordinates={setCoordinates} setWeather={setWeather} setSearchOptions={setSearchOptions} setIsDataLoading={setIsDataLoading} setSearchToolOpen={setSearchToolOpen} />
                        <LocationList setDisplayDate={setDisplayDate} setWeather={setWeather} searchOptions={searchOptions} isDataLoading={isDataLoading} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} locations={locations} setLocations={setLocations} setSelectedLocation={setSelectedLocation} />
                    </div>
                </div>
                :
                null
            }
        </div>
    )
}

export default SearchLocationTool;