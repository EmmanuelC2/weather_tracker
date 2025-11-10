import React from "react";
import { getWeatherReportTwo } from "../../services/weather-service-api";

/**
 * Validates the manual search inputs before kicking off the geo lookup chain.
 * All validation lives here to keep the input component focused on rendering.
 */
export const SearchButton = ({ data }) => {
  const requestWeatherData = (info) => {
    if (info.city === "" && info.country === "") {
      info.setError("Require City and Country input!");
      return;
    }

    if (info.city === "") {
      info.setError("Require City input!");
      return;
    }

    if (info.country === "") {
      info.setError("Require Country input!");
      return;
    }

    if (info.state === "" && info.country === "united states of america (the)") {
      info.setError("Please enter State if Country selected is united states of america (the)");
      return;
    }

    // Happy path clears validation errors and starts the fetch chain.
    info.setError("");
    // Flag the manual workflow as loading so the spinner appears in the location list.
    info.setIsDataLoading(true);
    getWeatherReportTwo(info);
  };

  return (
    <div className="search-button-container">
      <button onClick={() => requestWeatherData(data)}>Search</button>
    </div>
  );
};

export default SearchButton;