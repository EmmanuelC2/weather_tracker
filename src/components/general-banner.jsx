import React from "react"
import SavedLocations from "./saved-locations";

export const GeneralBanner = ({locations, selectedLocation, setSelectedLocation}) => {

    return (
        <div className="general-banner">
            <h1 className="general-banner__headline">Weather</h1>
            <SavedLocations locations={locations} selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
        </div>
    )

}

export default GeneralBanner;