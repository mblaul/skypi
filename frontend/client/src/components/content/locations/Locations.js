import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
// import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

class Locations extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { devices, loading } = this.props.devices;
    let locationsContent;

    // Table headers for table below
    const tableHeaders = ['Location', 'Last Update'];

    if (devices === [] || loading) {
      locationsContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (devices.length > 0) {
        let cityList = [];
        let lastUpdates = [];

        cityList = [
          ...new Set(
            devices.map(device => {
              return {
                city: device.lastWeatherLog.city,
                date: device.lastWeatherLog.date
              };
            })
          )
        ];
        let aggList = [];

        cityList.forEach(city => {
          aggList.push(city);
        });

        console.log(aggList);

        locationsContent = (
          <table className="table table-striped">
            <thead>
              <tr>
                {tableHeaders.map(header => (
                  <th scope="col" key={header}>
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {/* {cityList.map(city => (
                <tr key={city}>
                  <td>{city}</td>
                  <td>{city}</td>
                </tr>
              ))} */}
            </tbody>
          </table>
        );
      }
    }

    return (
      <div className="container mt-4">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="display-3 mb-3 text-center">Locations</div>
            {locationsContent}
          </div>
        </div>
      </div>
    );
  }
}

Locations.propTypes = {
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getPublicDevices }
)(Locations);
