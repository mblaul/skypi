import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
    const { devices } = this.props;
    console.log("map1");
    console.log(devices);
    console.log("map2");
    return (
      <div className="my-5">
        {/* The map will fill the size of the container */}
        <div style={{ height: '60vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {devices.map((device) =>
              <MapMarker
                lat={device.lastWeatherLog.latitude}
                lng={device.lastWeatherLog.longitude}
                text={device.name}
              />
            )}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  devices: PropTypes.object.isRequired
};

export default (Map);