import React, { Component } from 'react';
import PropTypes from 'prop-types';

import keys from './GoogleKey';
import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const API_KEY = keys.SKYPI_KEY;

class Map extends Component {
  static defaultProps = {
    zoom: 13
  };

  render() {
    const { devices } = this.props;
    const center = {
      lat: Math.floor(devices[0].lastWeatherLog.latitude * 10000) / 10000,
      lng: Math.floor(devices[0].lastWeatherLog.longitude * 10000) / 10000
    };
    return (
      <div className="my-5">
        {/* The map will fill the size of the container */}
        <div style={{ height: '60vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: API_KEY }}
            defaultCenter={center}
            defaultZoom={this.props.zoom}
          >
            {devices.map(device => (
              <MapMarker
                lat={device.lastWeatherLog.latitude}
                lng={device.lastWeatherLog.longitude}
                text={device.name}
              />
            ))}
          </GoogleMapReact>
        </div>
      </div>
    );
  }
}

Map.propTypes = {
  devices: PropTypes.object.isRequired
};

export default Map;
