import { callExternalAPI } from "./external-api.service";

const baseGeoCodesAPI = import.meta.env.VITE_BASE_GEO_CODES_URL;

/**
 * Validates manual search inputs before requesting normalized state/country data
 * from the project-specific Geo Codes API.
 */
export const callGeoCodesAPI = async (list) => {
  if (list.country !== null) {
    if (list.country.trim() === "") {
      return {
        data: null,
        error: " Country Required! (US Requires State)!",
      };
    }
  } else {
    return {
      data: null,
      error: " Country Required! (US Requires State)!",
    };
  }

  const config = {
    // Ask the custom backend to resolve standardized state/country names.
    url: `${baseGeoCodesAPI}data?state=${list.state}&country=${list.country}`,
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
