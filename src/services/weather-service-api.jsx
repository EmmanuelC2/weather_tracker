import { callExternalAPI } from "./external-api.service";
import { callGeoCodesAPI } from "./geo-codes-api";
import { callGeoLocationAPI } from "./geo-location-api";

const baseWeatherAPI = import.meta.env.VITE_BASE_WEATHER_URL;
const apiKey = import.meta.env.VITE_WEATHER_KEY;

const part = ["minutely", "hourly", "daily", "alerts"];
const units = "imperial";

/**
 * Temporary fixture keeps the UI functional while backend credentials are unavailable.
 * Replace with the real OpenWeather call below once environment variables are wired up.
 */
export const callWeatherAPI = async (search) => {
  if (!search) {
    return {
      data: null,
      error: { message: "Missing coordinates" },
    };
  }

  const latitude = Number(search.latitude ?? search.lat);
  const longitude = Number(search.longitude ?? search.lon);

  const fakeData = {
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
  };

  if (!baseWeatherAPI || !apiKey || Number.isNaN(latitude) || Number.isNaN(longitude)) {
    return {
      data: fakeData,
      error: null,
    };
  }

  const config = {
    url: `${baseWeatherAPI}onecall?lat=${latitude.toFixed(2)}&lon=${longitude.toFixed(2)}&units=${units}&exclude=${part}&appid=${apiKey}`,
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
};

const computeDisplayDate = (weatherData) => {
  const utcTime = new Date(0);
  const utcSeconds = weatherData.current_time - weatherData.timezone_offset;
  utcTime.setUTCSeconds(utcSeconds);
  return utcTime.toLocaleString();
};

const buildSavedLocation = (city, weatherData) => ({
  city,
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
});

const persistLocation = (userData, locationName, weatherData) => {
  if (!Array.isArray(userData.locations) || !userData.setLocations) {
    return;
  }

  const payload = buildSavedLocation(locationName, weatherData);

  if (userData.locations.length === 0) {
    userData.setLocations((existing) => [...existing, payload]);
    return;
  }

  const duplicateExists = userData.locations.some((location) => location.city === payload.city);

  if (duplicateExists) {
    console.log("Location is already saved!");
    return;
  }

  if (userData.locations.length < 5) {
    userData.setLocations((existing) => [...existing, payload]);
  } else {
    console.log("Too many locations saved! Please remove a location to add more.");
  }
};

/**
 * Uses existing coordinates to hydrate the weather state and optionally persists
 * the result as a saved location.
 */
export const getWeatherReport = async (userData) => {
  const { data, error } = await callWeatherAPI(userData.coordinates);

  if (error || !data) {
    userData.setWeather?.(error ? error.message : "Unable to load weather data");
    return;
  }

  const displayDate = computeDisplayDate(data);

  userData.setWeather?.(data);
  userData.setDisplayDate?.(displayDate);

  const locationName = userData.city ?? userData.currentLocation ?? "";
  if (locationName !== "") {
    userData.setCurrentLocation?.(locationName);
    persistLocation(userData, locationName, data);
    userData.setSelectedLocation?.(locationName);
  }

  userData.setAutoToolOpen?.(true);
  userData.setSearchToolOpen?.(false);
};

/**
 * Manual search workflow: validate inputs, normalize them through the geo codes
 * service, then request candidate locations from OpenWeather so the user can pick one.
 */
export const getWeatherReportTwo = async (userData) => {
  if (userData.city.trim() === "" && userData.country.trim() === "") {
    console.log("Error: Require City and Country! (US requires State)");
    userData.setIsDataLoading?.(false);
    return;
  }

  let list = {
    city: userData.city,
    state: userData.state,
    country: userData.country,
  };

  const { data, error } = await callGeoCodesAPI(list);

  if (error) {
    console.log(error);
    userData.setIsDataLoading?.(false);
    return;
  }

  list = {
    city: userData.city,
    state: data.state,
    country: data.country,
  };

  await callGeoLocationAPI(list, userData.searchOptions, userData.setSearchOptions, userData.setIsDataLoading);

  userData.setIsDataLoading?.(false);
};
