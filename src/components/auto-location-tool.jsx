import React, { useState, useEffect} from "react";
import AutoSearch from "./auto-search";
import { callCoordsAPI } from "../services/geo-coords-api";
import plus from "/plus.png";
import minus from "/minus.png";

export const AutoLocationTool = ({ weather, setWeather, coordinates, setCoordinates, locations, setLocations, currentLocation, setCurrentLocation, selectedLocation, setSelectedLocation, displayDate, setDisplayDate}) => {
    const [autoToolOpen, setAutoToolOpen] = useState(false);
    
    useEffect(() => {
        if(coordinates===undefined){
            callCoordsAPI(setCoordinates);
        }
        
        if(coordinates!==undefined && locations[0] === undefined){setAutoToolOpen(true);}

    }, [coordinates,setCoordinates,setAutoToolOpen]);
    
    const handleEvent = () => {
        console.log("open auto tool module");
    }

    return (

        <div className="auto-location-tool-outer-container">

            <button className="auto-location-tool-container" onClick={handleEvent}>
                <img
                    className="auto-location-tool-img"
                    src={autoToolOpen ? minus : plus}
                    onClick={() => setAutoToolOpen(prevMode => !prevMode)}
                    alt="plus sign">
                </img>
            </button>

            {autoToolOpen ?

                <div>
                    <AutoSearch  setAutoToolOpen={setAutoToolOpen} displayDate={displayDate} setDisplayDate={setDisplayDate} weather={weather} setWeather={setWeather} coordinates={coordinates} setCoordinates={setCoordinates} locations={locations} setLocations={setLocations} currentLocation={currentLocation} setCurrentLocation={setCurrentLocation} setSelectedLocation={setSelectedLocation} />
                </div>
                :
                null
            }

        </div>
    )
}

export default AutoLocationTool;
