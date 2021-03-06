import React, { Component } from "react";
import { compose, withProps } from "recompose";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker,
  InfoWindow
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
)(props => {
  return (
    <GoogleMap
      defaultZoom={11}
      defaultCenter={{ lat: props.center.lat, lng: props.center.lng }}
    >
      {props.markers.map((marker, index) => {
        return (
          <Marker position={{ lat: marker.lat, lng: marker.lng }} key={index}>
            <InfoWindow>
              <div>
                <b>{marker.name}</b>
                <p>Telefone: {marker.phone}</p>
                <p>Site: {marker.url}</p>
              </div>
            </InfoWindow>
          </Marker>
        );
      })}
    </GoogleMap>
  );
});

class Maps extends Component {
  render() {
    return <MyMapComponent key="map" {...this.props} />;
  }
}

export default Maps;
