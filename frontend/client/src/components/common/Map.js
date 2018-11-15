import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDevices } from '../../actions/deviceActions';

import GoogleMapReact from 'google-map-react';
import MapMarker from './MapMarker';

const API_KEY = "AIzaSyDF7OuqlgIjCV8SFZ5BVH23pGK4-UQ1qlY";
 
class Map extends Component {
  componentDidMount() {
    this.props.getPublicDevices();
  }

  static defaultProps = {
    center: {
      lat: 42.6679,
      lng: -83.2082
    },
    zoom: 13
  };
 
  render() {
    const { devices } = this.props.devices;
    console.log(devices);
    return (
      //The map will fill the size of the container
      <div style={{ height: '90vh', width: '100%' }}>
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
          {/* <MapMarker
            lat={42.66}
            lng={-83.20}
            text={'A'}
          /> */}
        </GoogleMapReact>
      </div>
    );
  }
}

Map.propTypes = {
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices
})

export default connect(
  mapStateToProps,
  { getPublicDevices }
)(Map);