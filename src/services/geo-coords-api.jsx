export const callCoordsAPI = (setCoordinates) => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition((position) => {
      let {latitude, longitude} = position.coords;
      latitude = latitude.toFixed(2);
      longitude = longitude.toFixed(2);
      setCoordinates({latitude, longitude});
    }, (error) => {
      console.error(`Error, MDN Geolocation API message: `,error.message); 
    });
  }else{
    console.error(`Geolocation not supported by browser!`);
  }
}
