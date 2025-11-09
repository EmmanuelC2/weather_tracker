import { callExternalAPI } from './external-api.service';

const baseGeoAPI = import.meta.env.VITE_BASE_GEO_URL;
const apiKey = import.meta.env.VITE_WEATHER_KEY;

export const callGeoLocationAPI = async (search, searchOptions, setSearchOptions, setIsDataLoading) => {
  
  const config = {
    url: `${baseGeoAPI}direct?q=${search.city},${search.country}&limit=${'5'}&appid=${apiKey}`,
    method: "GET",
    headers: {
      "content-type": "application/json",
    },
  };

  const { data, error } = await callExternalAPI({ config });

  setSearchOptions([]);

  for (let i = 0; i < data.length; i++) {
    setSearchOptions(searchOptions => [...searchOptions, data[i]]);
  }

  setIsDataLoading(false);

  return {
    data: data || null,
    error,
  };
}