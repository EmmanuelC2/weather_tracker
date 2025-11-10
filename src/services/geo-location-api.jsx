import { callExternalAPI } from "./external-api.service";

const baseGeoAPI = import.meta.env.VITE_BASE_GEO_URL;
const apiKey = import.meta.env.VITE_WEATHER_KEY;

/**
 * Requests candidate city matches from the OpenWeather geo API and stores them
 * so the manual search flow can render pickable options.
 */
export const callGeoLocationAPI = async (
  search,
  searchOptions,
  setSearchOptions,
  setIsDataLoading
) => {
  const config = {
    // Query the OpenWeather geo endpoint to receive a list of candidate cities.
    url: `${baseGeoAPI}direct?q=${search.city},${search.country}&limit=${"5"}&appid=${apiKey}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalAPI({ config });

  setSearchOptions([]);

  if (Array.isArray(data)) {
    data.forEach((result) => {
      // Preserve previous options while appending the new result set.
      setSearchOptions((previous) => [...previous, result]);
    });
  }

  // Notify the UI that the lookup has resolved.
  setIsDataLoading(false);

  return {
    data: Array.isArray(data) ? data : null,
    error,
  };
};
