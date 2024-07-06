import { useState, useEffect, useCallback } from 'react'
import { GoogleMap, useJsApiLoader, MarkerF } from '@react-google-maps/api'


//AIzaSyAUOaqvIuBuaQqPT57bQ_t8qNu8IiJXGSw


const VenueMap = (venue) => {

   const { isLoaded } = useJsApiLoader({
      id: 'google-map-script', 
      googleMapsApiKey: 'AIzaSyAUOaqvIuBuaQqPT57bQ_t8qNu8IiJXGSw',
   })


   const style = {
      maxWidth: "450px",
      height: "450px",
      width: '100%',
      overflowX: "hidden",
      overflowY: "hidden"
   };
   const containerStyle = {
      maxWidth: "450px",
      height: "450px"
   };


   console.log('preparse: ', venue.location.latitude, venue.location.longitude)
   const center = {
      lat: parseFloat(venue.location.latitude),
      lng: parseFloat(venue.location.longitude)
   }


   const onLoad = marker => {
      console.log('marker: ', marker)
   }
   console.log('center is: ', center);


   return (
      <>
      {
         isLoaded &&
         (
         <GoogleMap
            mapContainerStyle={containerStyle}
            style={style}
            center={center}
            zoom={15}
         >
            <MarkerF
               onLoad={onLoad}
               position={center}
               style={{
                  color:'red'
               }}
            />
         </GoogleMap>
         )
      }
      </>
   )
}

export default VenueMap



