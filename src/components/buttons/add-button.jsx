import React from "react";

export const AddButton = () => {

    const addLocation = () =>{
        console.log("add to a location list user can switch ")
    }

    return(
        <div className="search-button-container">
            <button
                onClick={() => addLocation()}
            >
                Add
            </button>
        </div>
    )
}

export default AddButton;