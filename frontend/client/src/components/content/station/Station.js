import React, { Component } from 'react';
import Moment from 'react-moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getDeviceWeatherData } from '../../../actions/weatherActions';
import { getPublicDevices } from '../../../actions/deviceActions';

// Import common components
import Spinner from '../../common/Spinner';

// Import pieces of Station
import Map from '../../common/Map';
import Quickview from '../dashboard/Quickview';
import Timegraph from '../dashboard/Timegraph';
import UnitConversions from '../dashboard/UnitConversions';

class Station extends Component {
  constructor() {
    super();

    this.state = {
      // displayLimit State is a state of Dashboard.js, created in an attempt to control data points shown by Timegraph.js component
      displayLimit: 1
    };
  }

  //Function to handle user input regarding how many hours of readings to display
  displayedReadingRange(selectedTimeFrame) {
    this.setState({
      displayLimit: selectedTimeFrame * 4
    });
  }

  componentDidMount() {
    if (!this.props.auth) {
      this.props.history.push('/login');
    }
    this.props.getDeviceWeatherData(this.props.match.params.deviceId);
    this.props.getPublicDevices();
  }

  componentWillReceieveProps(nextProps) {
    if (!nextProps.auth) {
      this.props.history.push('/login');
    }
  }

  render() {
    const { weatherLogs, loading } = this.props.weather;
    const { devices } = this.props.devices;

    let myDevice;
    let stationContent;
    // Check to see if values have fully loaded for weather data
    if (weatherLogs === undefined || devices === [] || loading) {
      //If it hasn't loaded display spinner
      stationContent = <Spinner />;
    } else {
      //If it has loaded, ensure weatherLogs' length isn't zero then display data
      if (weatherLogs.length > 0 && devices.length > 0) {
        const quickInfo = weatherLogs[0];
        const weatherDates = weatherLogs.map(logs => logs.date);
        const weatherHumidity = weatherLogs.map(logs => logs.humidity);
        const weatherPressure = weatherLogs.map(logs => logs.pressure);
        const weatherTemperature = weatherLogs.map(logs => logs.temperature);
        const weatherWind = weatherLogs.map(logs => logs.wind);
        const convertUnits = true;

        for (let x = 0; x < devices.length; x++) {
          if (devices[x].name === weatherLogs[0].source) {
            myDevice = devices[x];
          }
        }

        stationContent = (
          <div>
            <div className="row my-4">
              <div className="text-center mx-auto">
                <div className="strong display-2">{quickInfo.source}</div>
                <div className="text-muted mb-3">
                  Last Updated:{' '}
                  <Moment format="YYYY/MM/DD h:mm A">{quickInfo.date}</Moment>
                </div>
              </div>
            </div>
            <div className="row mb-3">
              <Quickview
                Type={'Temperature'}
                Reading={UnitConversions(
                  quickInfo.temperature,
                  convertUnits,
                  'Temperature'
                )}
              />
              <Quickview
                Type={'Wind Speed'}
                Reading={UnitConversions(quickInfo.wind, convertUnits, 'Wind')}
              />
              <Quickview Type={'Humidity'} Reading={quickInfo.humidity + '%'} />
              <Quickview
                Type={'Wind Direction'}
                Reading={quickInfo.winddirection}
              />
              <Quickview
                Type={'Pressure'}
                Reading={UnitConversions(
                  quickInfo.pressure,
                  convertUnits,
                  'Pressure'
                )}
              />
              <Quickview
                Type={'Precipitation %'}
                Reading={Number(quickInfo.precipitation) * 100 + '%'}
              />
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(2)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 2 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(6)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 6 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(12)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 12 Hours
                </button>
              </div>
              <div className="col-sm-12 col-md-12 col-lg-3">
                <button
                  onClick={() => this.displayedReadingRange(24)}
                  type="button"
                  className="btn btn-secondary"
                >
                  Past 24 Hours
                </button>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Temperature'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherTemperature}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Wind'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherWind}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Humidity'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherHumidity}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
              <div className="col-sm-12 col-md-12 col-lg-6">
                <Timegraph
                  chartLabel={'Pressure'}
                  weatherDates={weatherDates}
                  weatherLogs={weatherPressure}
                  limitDisplay={this.state.displayLimit}
                  convertUnits={convertUnits}
                />
              </div>
            </div>
            <Map devices={[myDevice]} />
          </div>
        );
      } else {
        // User is logged in but has not favorited a device yet
        stationContent = (
          <div className="mx-auto">
            <p className="lead alert alert-warning">
              Ruh roh, stations/weather logs are not loading!
              <br />
              Please refresh.
            </p>
          </div>
        );
      }
    }

    return <div className="container mt-2">{stationContent}</div>;
  }
}

Station.propTypes = {
  getDeviceWeatherData: PropTypes.func.isRequired,
  getPublicDevices: PropTypes.func.isRequired,
  devices: PropTypes.object.isRequired,
  weather: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  devices: state.devices,
  weather: state.weather
});

export default connect(
  mapStateToProps,
  { getDeviceWeatherData, getPublicDevices }
)(Station);
