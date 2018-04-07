import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const MyMapComponent = compose(
  withProps({
    googleMapURL:
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyBGrr7pOLOfuCFFPE4m5tdZsE3aCv-P8BM&v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `100%` }} />,
    mapElement: <div style={{ height: `100%` }} />
  }),
  withScriptjs,
  withGoogleMap
)(props => (
  <GoogleMap defaultZoom={9} defaultCenter={{ lat: -23.533, lng: -46.625 }}>
    <Marker position={{ lat: -23.533, lng: -46.625 }} />
  </GoogleMap>
));

class Maps extends Component {
  render() {
    return <MyMapComponent key="map" />;
  }
}

export default Maps;
