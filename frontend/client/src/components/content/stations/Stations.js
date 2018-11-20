import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getPublicDevices } from '../../../actions/deviceActions';
import { setFavoriteDevice } from '../../../actions/authActions';
import { getFavoriteWeatherData } from '../../../actions/weatherActions';

// Import common components
import Map from '../../common/Map';
import Spinner from '../../common/Spinner';

class Stations extends Component {
  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getPublicDevices();
    this.props.getFavoriteWeatherData();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  onFavoriteClick(deviceId) {
    this.props.setFavoriteDevice(deviceId);
    this.props.getFavoriteWeatherData();
  }

  render() {
    const { devices, loading } = this.props.devices;
    const { weatherLogs } = this.props.weather;
    let currentFavorite;
    let stationsContent;

    /* If a favorite device is not found, default to first listed device */
    if (weatherLogs[0] !== undefined) {
      currentFavorite = weatherLogs[0];
    }

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
          <div>
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
                      <Link to={`/station/${device._id}`}>{device.name}</Link>
                    </th>
                    {device.lastWeatherLog ? (
                      Object.keys(device.lastWeatherLog).length > 0 ? (
                        <td>{device.lastWeatherLog.city}</td>
                      ) : (
                        <td>Not logged yet</td>
                      )
                    ) : (
                      <td>Not logged yet</td>
                    )}
                    {device.lastWeatherLog ? (
                      Object.keys(device.lastWeatherLog).length > 0 ? (
                        <td>
                          <Moment format="YYYY/MM/DD h:mm A">
                            {device.lastWeatherLog.date}
                          </Moment>
                        </td>
                      ) : (
                        <td>Not logged yet</td>
                      )
                    ) : (
                      <td>Not logged yet</td>
                    )}
                    <td>{device.status}</td>
                    <td>
                      <button
                        onClick={this.onFavoriteClick.bind(this, device._id)}
                        type="button"
                        className={
                          currentFavorite !== undefined &&
                          (device.name === currentFavorite.source ||
                            device.name === currentFavorite.name)
                            ? 'btn bg-warning'
                            : 'btn'
                        }
                      >
                        {/* If this row is the favorite device, highlight the star */}
                        <i
                          className={
                            currentFavorite !== undefined &&
                            (device.name === currentFavorite.source ||
                              device.name === currentFavorite.name)
                              ? 'fas fa-star fa-inverse'
                              : 'fas fa-star'
                          }
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* <Map devices={devices} /> */}
          </div>
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
  getFavoriteWeatherData: PropTypes.func.isRequired,
  getPublicDevices: PropTypes.func.isRequired,
  setFavoriteDevice: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  devices: state.devices,
  weather: state.weather,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getFavoriteWeatherData, getPublicDevices, setFavoriteDevice }
)(Stations);
