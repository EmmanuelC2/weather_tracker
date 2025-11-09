import React, { useState } from "react";
import { RotatingLines } from "react-loader-spinner";
import { getWeatherReport } from "../services/weather-service-api";

export const LocationList = ({ setWeather, setDisplayDate, searchOptions, isDataLoading, currentLocation,setCurrentLocation}) => {

    const handleChange = (event) => {

        let location = event.target.value.split(',');
        let data;

        console.log("Called handleChange on location list: ");

        for (let x of searchOptions) {

            if (x.name.trim() === location[0].trim() && x.state.trim() === location[1].trim() && x.country.trim() === location[2].trim()) {

                data = {
                    coordinates: {
                        lat: x.lat,
                        lon: x.lon,
                    },
                    setDisplayDate,
                    setWeather,
                    currentLocation,
                    setCurrentLocation,
                    city: x.name.trim(),
                };

                getWeatherReport(data);
                break;
            }

        }
    }

    return (
        <div className="list-outer-container">
            {searchOptions ?
                (
                    <div className="location-list-container">

                        <label className="list-header">Click a Location to save: </label>

                        {isDataLoading ?
                            <ol className="unordered-list">
                                <RotatingLines 
                                    strokeColor="black"
                                    strokeWidth="5"
                                    animationDuration="0.75"
                                    width="96"
                                    visible={true}
                                />
                            </ol>

                            :

                            <ol className="unordered-list">

                                {searchOptions.map((options, index) =>

                                    <li className="location-list-items" key={index}>
                                        <div className="location-list-button-container">
                                            <input
                                                className="location-list-button"
                                                type="button"
                                                value={[options.name + ", " + options.state + ", " + options.country]}
                                                onClick={handleChange}
                                            >
                                            </input>
                                        </div>
                                    </li>

                                )}

                            </ol>

                        }

                    </div>

                )
                :
                (
                    <div>
                    </div>
                )

            }


        </div>
    )
}

export default LocationList;