import React from "react";
import { getWeatherReportTwo } from "../../services/weather-service-api";

export const SearchButton = ({ data }) => {

    const requestWeatherData = (info) => {

        if (info.city === "" && info.country === "") {
            info.setError("Require City and Country input!");
        } else if (info.city === "") {
            info.setError("Require City input!");
        } else if (info.country === "") {
            info.setError("Require Country input!");
        } else if (info.state === "" && info.country === "united states of america (the)") {
            info.setError("Please enter State if Country selected is united states of america (the)");
        } else {
            info.setError("");
            // info.setCity("");
            //info.setState("");
            //info.setStateInput("");
            //info.setCountry("");
            //info.setCountryInput("");
            info.setIsDataLoading(true);
            getWeatherReportTwo(info);
            
        }
    }

    return (
        <div className="search-button-container">
            <button
                onClick={() => requestWeatherData(data)}
            >
                Search
            </button>
        </div>
    )
}
export default SearchButton;