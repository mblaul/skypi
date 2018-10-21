import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

class Stations extends Component {
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
    let stationsContent;

    if (devices === [] || loading) {
      stationsContent = <Spinner />;
    } else {
      // Check to see if values have fully loaded for weather data
      if (devices.length > 0) {
        const tableHeaders = [
          'Station',
          'Location',
          'Last Update',
          'Status',
          'Favorite'
        ];
        stationsContent = (
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
              {devices.map(device => (
                <tr key={device._id}>
                  <th scope="row" key={device._id}>
                    {device.name}
                  </th>
                  {'city' in device.lastWeatherLog === true ? (
                    <td>{device.lastWeatherLog.city}</td>
                  ) : (
                    <td>N/A</td>
                  )}
                  {'city' in device.lastWeatherLog === true ? (
                    <td>
                      <Moment format="YYYY/MM/DD h:mm A">
                        {device.lastWeatherLog.date}
                      </Moment>
                    </td>
                  ) : (
                    <td>N/A</td>
                  )}
                  <td>{device.status}</td>
                  <td>
                    <button type="button" className="btn">
                      <i className="fas fa-star text-alert" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        );
      }
    }

    return (
      <div className="container mt-4">
        <div className="row mb-2">
          <div className="col-sm-12 col-md-12 col-lg-12">
            <div className="display-3 mb-3 text-center">Stations</div>
            <div className="my-2">
              <div className="btn-group btn-group-toggle" data-toggle="buttons">
                <label className="btn btn-secondary active">
                  <input
                    type="radio"
                    name="options"
                    id="option1"
                    autoComplete="off"
                    checked
                  />{' '}
                  Public
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option2"
                    autoComplete="off"
                  />{' '}
                  Mine
                </label>
                <label className="btn btn-secondary">
                  <input
                    type="radio"
                    name="options"
                    id="option3"
                    autoComplete="off"
                  />{' '}
                  Official
                </label>
              </div>
            </div>
            {stationsContent}
          </div>
        </div>
      </div>
    );
  }
}

Stations.propTypes = {
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
)(Stations);
