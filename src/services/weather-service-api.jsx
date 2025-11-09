import { callExternalAPI } from "./external-api.service";
import { callGeoCodesAPI } from "./geo-codes-api";
import { callGeoLocationAPI } from "./geo-location-api";

const baseWeatherAPI = import.meta.env.VITE_BASE_WEATHER_URL;
const apiKey = import.meta.env.VITE_WEATHER_KEY;

const part = ["minutely", "hourly", "daily", "alerts"];
const units = "imperial";

export const callWeatherAPI = async (search) => {
  console.log("calling api");

  let fakedata = {
    lat: 36.31,
    lon: -119.35,
    timezone: "America/Chicago",
    timezone_offset: -18000,
    current_time: 1684929490,
    sunrise: 1684926645,
    sunset: 1684977332,
    temp: 292.55,
    clouds: 53,
    visibility: 10000,
    wind_speed: 3.13,
    weather_main: "Clouds",
    weather_desc: "broken clouds",
  }
  let error = null;
  return {
    data: fakedata,
    error,
  }

  /*
  const config = {
    url: `${baseWeatherAPI}onecall?lat=${search.latitude.toFixed(2)}&lon=${search.longitude.toFixed(2)}&units=${units}&exclude=${part}&appid=${apiKey}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalAPI({ config });

  return {
    data: data || null,
    error,
  };
  */
};

//use coordinates already obtained from geo coords api to call weather api.
export const getWeatherReport = async (userData) => {

  const { data, error } = await callWeatherAPI(userData.coordinates);

  let utcTime = new Date(0);
  let utcSecs = data.current_time - data.timezone_offset;
  utcTime.setUTCSeconds(utcSecs);

  if (data) {
    userData.setWeather(data);
    userData.setDisplayDate(utcTime.toLocaleString())
    userData.setCurrentLocation(userData.city)
    console.log(userData.currentLocation)
    if (userData.currentLocation !== "") {
      let info = {
        city: userData.currentLocation,
        lat: data.lat,
        lon: data.lon,
        timezone: data.timezone,
        timezone_offset: data.timezone_offset,
        current_time: data.current_time,
        sunrise: data.sunrise,
        sunset: data.sunset,
        temp: data.temp,
        clouds: data.clouds,
        visibility: data.visibility,
        wind_speed: data.wind_speed,
        weather_main: data.weather_main,
        weather_desc: data.weather_desc,
      }

      if (userData.locations[0] === undefined) {
        userData.setLocations(x => [...x, info]);
      } else {
        for (let i = 0; i < userData.locations.length; i++) {
          if (userData.locations[i].city === info.city) {
            console.log("Location is already saved!");
          }
        }

        if (userData.locations.length < 5) {
          userData.setLocations(x => [...x, info]);
        } else {
          console.log("Too many locations saved! Please remove a location to add more.");
        }
      }
      userData.setSelectedLocation(info.city);
      userData.setAutoToolOpen(true);
      userData.setSearchToolOpen(false);
    }
  }
  if (error) {
    userData.setWeather(error.message);
  }
}

//get geo codes from geo code api then geo location from openweather api using geo codes and then call weather api
export const getWeatherReportTwo = async (userData) => {

  if (userData.city.trim() !== "" || userData.country.trim() !== "") {

    let list = {
      city: userData.city,
      state: userData.state,
      country: userData.country
    }

    const { data, error } = await callGeoCodesAPI(list);

    if (!error) {
      list = {
        city: userData.city,
        state: data.state,
        country: data.country,
      }

      await callGeoLocationAPI(list, userData.searchOptions, userData.setSearchOptions, userData.setIsDataLoading);

      userData.setIsDataLoading(false);

    } else {
      console.log(error);
    }


  } else {

    console.log("Error: Require City and Country! (US requires State)");

  }

}