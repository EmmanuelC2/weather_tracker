import React, {useState, useEffect} from "react";
import TextField from "@mui/material/TextField";
import { AddCityButton } from "./buttons/add-city-button"
import { getWeatherReport } from "../services/weather-service-api";

export const AutoSearch = ({ setAutoToolOpen, displayDate, setDisplayDate, weather, setWeather, coordinates, setCoordinates,locations, setLocations, currentLocation, setCurrentLocation, setSelectedLocation}) => {
    
    let data = {
        displayDate,
        setDisplayDate,
        coordinates,
        setWeather,
        setCoordinates,
    } 

    useEffect(() => {
        if (coordinates !== undefined && typeof(weather) === "string") {
            getWeatherReport(data); 
        }
        
    }, [data.setDisplayDate, data.setWeather, data.coordinates, getWeatherReport]);


    const handleInput = (e) => {
        setCurrentLocation(e.target.value);
    }

    return (
        <div className="weather-feature-container">

            {typeof (weather) === "string" ?
                (
                    <div>
                        <h2>Welcome,</h2>
                        <p>{weather}</p>
                    </div>
                )
                :
                (
                    <div>
                        {locations[0] === undefined ? (

                            <div className="input-city-outer-container">
                                <div className="input-city-label"><span>Enter Current City Location: </span></div>

                                <div className="input-city-container">

                                    <TextField label="City" value={currentLocation} onChange={handleInput} />

                                    <AddCityButton setAutoToolOpen={setAutoToolOpen} currentLocation={currentLocation} locations={locations} setLocations={setLocations} weather={weather} setSelectedLocation={setSelectedLocation}/>

                                </div>
                            </div>
                        ) : (
                            <div>
                                <h2>{currentLocation}</h2>
                            </div>
                        )
                        }
                        <p>{displayDate}</p>
                        <p>{weather.temp}ºF</p>
                        <p>{weather.weather_main}</p>
                        <p>{weather.weather_desc}</p>
                    </div>
                )
            }

        </div>
    )
}

//weather.current.temp, weather.current.weather[0].main,weather.current.weather[0].description

export default AutoSearch;