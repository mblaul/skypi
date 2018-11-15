import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const API_KEY = "AIzaSyDF7OuqlgIjCV8SFZ5BVH23pGK4-UQ1qlY";
 
class Map extends Component {
  static defaultProps = {
    center: {
      lat: 42.6679,
      lng: -83.2082
    },
    zoom: 13
  };
 
  render() {
    return (
      //The map will fill the size of the container
      <div style={{ height: '90vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: API_KEY }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          <MapMarker
            lat={42.66}
            lng={-83.20}
            text={'A'}
          />
        </GoogleMapReact>
      </div>
    );
  }
}
 
export default Map;