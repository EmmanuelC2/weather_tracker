import React from "react";

export const AddCityButton = ({ setAutoToolOpen, currentLocation, locations, setLocations, weather, setSelectedLocation }) => {

    const addCity = (location, weatherData) => {
        /*
        let data = {
            city: location,
            lat: weatherData.lat,
            lon: weatherData.lon,
            timezone: weatherData.timezone,
            timezone_offset: weatherData.timezone_offset,
            current_time: weatherData.current.dt,
            sunrise: weatherData.current.sunrise,
            sunset: weatherData.current.sunset,
            temp: weatherData.current.temp,
            clouds: weatherData.current.clouds,
            visibility: weatherData.current.visibility,
            wind_speed: weatherData.current.wind_speed,
            weather_main: weatherData.current.weather[0].main,
            weather_desc: weatherData.current.weather[0].description,
        }
        */
        if (currentLocation !== "") {
            let data = {
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
            }

            if (locations[0] === undefined) {
                setLocations(x => [...x, data]);
            } else {
                for (let i = 0; i < locations.length; i++) {
                    if (locations[i].city === data.city) {
                        console.log("Location is already saved!");
                    }
                }

                if(locations.length < 5){
                    setLocations(x => [...x, data]);
                }else{
                    console.log("Too many locations saved! Please remove a location to add more.");
                }
            }
            setSelectedLocation(data.city);
            setAutoToolOpen(false);
        }
    }

    return (
        <div className="add-city-button-container">
            <button
                onClick={() => addCity(currentLocation, weather)}
            >
                Add
            </button>
        </div>
    )
}

export default AddCityButton;