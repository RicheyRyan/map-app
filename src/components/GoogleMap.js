import React from "react";
import GoogleMapReact from "google-map-react";

const zoom = 14;

const GoogleMap = ({ center, children }) => {
  return (
    <GoogleMapReact
      zoom={zoom}
      // This is some issue in the lib for this function so
      // we can get around it by overriding its implementation with nothing
      // https://github.com/google-map-react/google-map-react/issues/843
      distanceToMouse={() => {}}
      defaultCenter={center}
      bootstrapURLKeys={{ key: process.env.REACT_APP_MAPS_KEY }}
    >
      {children}
    </GoogleMapReact>
  );
};

export const MapMarker = ({ lat, lng, children }) => {
  return React.cloneElement(children, { lat, lng });
};

export default GoogleMap;
